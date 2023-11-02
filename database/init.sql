create database DMS

go

use DMS

go

create proc createTables as
begin tran
	begin try
		create table admin(
			id int not null identity(1, 1) primary key,
			name nvarchar(64) not null check(len(name) > 0),
			password nvarchar(64) not null,
			phone nchar(10) not null check(isnumeric(phone) = 1)
		)

		create table staff(
			id int not null identity(1, 1) primary key,
			name nvarchar(64) not null check(len(name) > 0),
			password nvarchar(64) not null,
			phone nchar(10) not null check(isnumeric(phone) = 1),
			gender nvarchar(8) check(gender = null or gender in ('male', 'female')),
			isLocked bit not null default(0)
		)

		create table patient(
			id int not null identity(1, 1) primary key,
			name nvarchar(64) not null check(len(name) > 0),
			password nvarchar(64) not null default('DMS123'),
			phone nchar(10) not null check(isnumeric(phone) = 1),
			gender nvarchar(8) check(gender = null or gender in ('male', 'female')),
			isLocked bit not null default(0),
			dob date not null,
			address nvarchar(128) not null check(len(address) > 0),
		)

		create table dentist(
			id int not null identity(1, 1) primary key,
			name nvarchar(64) not null check(len(name) > 0),
			password nvarchar(64) not null,
			phone nchar(10) not null check(isnumeric(phone) = 1),
			gender nvarchar(8) check(gender = null or gender in ('male', 'female')),
			isLocked bit not null default(0),
		)

		create table dentistSchedule(
			dentistId int not null foreign key references dentist(id),
			shift nvarchar(16) not null check(shift in ('morning', 'afternoon', 'evening')),
			date date not null,
			constraint pkDentistSchedule primary key(dentistId, shift, date)
		)

		create table appointment(
			dentistId int not null foreign key references dentist(id),
			patientId int not null foreign key references patient(id),
			shift nvarchar(16) not null check(shift in ('morning', 'afternoon', 'evening')),
			date date not null,
			status nvarchar(16)
			constraint pkAppointment primary key(dentistId, shift, date)
		)

		create table service(
			id int not null identity(1, 1) primary key,
			name nvarchar(64) not null check(len(name) > 0),
			description nvarchar(64) not null,
			price int not null check(price > 0)
		)

		create table drug(
			id int not null identity(1, 1) primary key,
			name nvarchar(64) not null check(len(name) > 0),
			directive nvarchar(64) not null,
			price int not null check(price > 0),
			unit nvarchar(64) not null check(len(unit) > 0),
		)

		create table drugBatch(
			drugId int not null foreign key references drug(id),
			expirationDate date not null,
			import int not null,
			isRemoved bit not null default(0),
			stock int not null,
			check(import >= stock and stock >= 0),
			constraint pkDrugBatch primary key(drugId, expirationDate)
		)

		create table prescribedDrug(
			prescriptionId int not null,
			drugId int not null,
			expirationDate date not null,
			dosage nvarchar(64) not null check(len(dosage) > 0),
			quantity float not null check(quantity > 0),

			constraint pkPrescribedDrug primary key(
				prescriptionId, drugId, expirationDate
			)
		)

		alter table prescribedDrug
			add foreign key (drugId, expirationDate)
			references drugBatch(drugId, expirationDate)

		create table prescription(
			id int not null identity(1, 1) primary key,
			total int not null
		)

		alter table prescribedDrug
			add foreign key (prescriptionId) references prescription(id)

		create table treatedService(
			treatmentId int not null,
			serviceId int not null foreign key references service(id),
			constraint pktreatedService primary key(treatmentId, serviceId)
		)

		create table treatment(
			id int not null identity(1, 1) primary key,
			
			dentistId int not null foreign key references dentist(id),
			shift nvarchar(16) not null check(shift in ('morning', 'afternoon', 'evening')),
			date date not null,

			prescriptionId int foreign key references prescription(id),

			symptoms nvarchar(64) not null,
			notes nvarchar(64) not null,
			toothTreated nvarchar(64) not null,
			outcome nvarchar(16) not null,
			treatmentCharge int not null check(treatmentCharge > 0),
			totalServiceCharge int not null 
		)

		alter table treatment
			add foreign key (dentistId, shift, date)
			references appointment(dentistId, shift, date)
		
		alter table treatedService
			add foreign key (treatmentId) references treatment(id)

		create table invoice(
			id int not null identity(1, 1) primary key,
			treatmentId int not null foreign key references treatment(id),
			issueDate date not null default(getdate()),
			total int not null 
		)
	end try
	begin catch
		print error_message()
		rollback tran
		return
	end catch
commit tran

go 

exec createTables

go

create function dbo.isPassword(@password nvarchar(64)) returns bit as
begin
	if 
		len(@password) > 8 and 
		@password like '%[0-9]%' and 
		@password like '%[a-z]%' and @password like '%[A-Z]%'
	begin
		return 1
	end

	return 0
end

go

create function dbo.isTotalPriceOf(
	@total int, @table nvarchar(16), @idName nvarchar(16), @id int
) 
returns bit as
begin
	declare @sql nvarchar(64) = 
		'select sum(price) from ' + @table + ' where ' + @idName + ' = ' + @id

	declare @actualTotal int 
	exec @actualTotal = sp_executesql @sql

	if @total = @actualTotal
	begin
		return 1
	end

	return 0
end

go

create function dbo.isTotalInvoicePriceOf(@total int, @id int) 
returns bit as
begin
	declare @treatmentCharge int, @totalServiceCharge int, @totalPrescriptionCharge int 
	
	select @treatmentCharge = treatmentCharge 
		from treatment where id = @id
	select @totalServiceCharge = totalServiceCharge 
		from treatment where id = @id
	select @totalPrescriptionCharge = p.total 
		from treatment t join prescription p on t.prescriptionId = p.id 
		where t.id = @id

	if @total = @treatmentCharge + @totalServiceCharge + @totalPrescriptionCharge
	begin
		return 1
	end

	return 0
end

go

create proc createConstraints as
begin tran
	begin try
		alter table admin add check(dbo.isPassword(password) = 1)
		alter table staff add check(dbo.isPassword(password) = 1)
		alter table patient add check(dbo.isPassword(password) = 1)
		alter table dentist add check(dbo.isPassword(password) = 1)
		alter table prescription add check(dbo.isTotalPriceOf(
				total, 'prescribedDrug', 'prescriptionId', id
		) = 1)
		alter table treatment add check(dbo.isTotalPriceOf(
			totalServiceCharge, 'treatedService', 'treatmentId', id
		) = 1)
		alter table invoice add check(dbo.isTotalInvoicePriceOf(
			total, treatmentId
		) = 1)
	end try
	begin catch
		print error_message()
		rollback tran
		return
	end catch
commit tran

go

exec createConstraints

go

create or alter proc test as 
begin
	print('test');
end

go 

create or alter proc getUserByCred(
	@phone nchar(10),
	@password nvarchar(64),
	@role nvarchar(16)
) 
with execute as owner
as
begin tran
	begin try
		declare @sql nvarchar(128) = 
			'select * from ' + @role + ' where phone = @phone and password = @password'

		exec sp_executesql @sql,
			N'@phone nchar(10), @password nvarchar(64)',
			@phone = @phone, @password = @password
	end try
	begin catch
		print error_message();
		rollback tran
		throw
	end catch
commit tran

go

create or alter proc createPatient(
	@name nvarchar(64),
	@password nvarchar(64),
	@phone nchar(10),
	@gender nvarchar(8),
	@dob date,
	@address nvarchar(128)
) as
begin tran
	begin try
		insert into patient(name, password, phone, gender, dob, address) 
			values (@name, @password, @phone, @gender, @dob, @address)

		select * from patient where phone = @phone
	end try
	begin catch
		print error_message();
		rollback tran
		throw
	end catch
commit tran

go

create proc createUsers as
begin tran
	begin try
		create login guest with password = 'guest'
		create login patient with password = 'patient'
		create login dentist with password = 'dentist'
		create login staff with password = 'staff'
		create login admin with password = 'admin'

		create user guestUser for login guest
		create user patientUser for login patient
		create user dentistUser for login dentist
		create user staffUser for login staff
		create user adminUser for login admin

		create role guests
		create role patients
		create role dentists
		create role staffs
		create role admins

		alter role guests add member guestUser
		alter role patients add member patientUser
		alter role dentists add member dentistUser
		alter role staffs add member staffUser
		alter role admins add member adminUser

		grant exec on dbo.getUserByCred to guests
		grant exec on dbo.createPatient to guests

		grant exec on dbo.test to guests
		grant exec on dbo.test to patients
		grant exec on dbo.test to dentists
		grant exec on dbo.test to staffs
		grant exec on dbo.test to admins
	end try
	begin catch
		print error_message()
		rollback tran
		return
	end catch
commit tran

go

exec createUsers