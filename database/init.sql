create database DMS
go
use DMS
go
set datefirst 7
go

create or alter proc _createTables as
begin tran
	set xact_abort on
	set nocount on

	begin try
		create table admin(
			id uniqueidentifier default(newid()) primary key,
			name nvarchar(64) not null,
			password nvarchar(64) not null,
			phone nchar(10) not null,

			constraint [Admin name is required.]
				check(len(name) > 0),
			constraint [Admin phone must contain only digits and have a length of 10.]
				check(isnumeric(phone) = 1 and len(phone) = 10),
			constraint [An admin with this phone number already exists.]
				unique(phone),
			constraint [Admin password must contain lowercases, uppercases and digits and must be at least 8 long.]
				check(len(password) >= 8 and password like '%[0-9]%' and password like '%[a-z]%' and password like '%[A-Z]%')
		)

		create table staff(
			id uniqueidentifier default(newid()) primary key,
			name nvarchar(64) not null,
			password nvarchar(64) not null,
			phone nchar(10) not null,
			gender nvarchar(8) ,
			isLocked bit not null default(0),

			constraint [Staff name is required.]
				check(len(name) > 0),
			constraint [Staff phone must contain only digits and have a length of 10.]
				check(isnumeric(phone) = 1 and len(phone) = 10),
			constraint [Staff gender must be null, 'male' or 'female'.]
				check(gender is null or gender in ('male', 'female')),
			constraint [A staff with this phone number already exists.]
				unique(phone),
			constraint [Staff password must contain lowercases, uppercases and digits and must be at least 8 long.]
				check(len(password) >= 8 and password like '%[0-9]%' and password like '%[a-z]%' and password like '%[A-Z]%')
		)

		create table patient(
			id uniqueidentifier default(newid()) primary key,
			name nvarchar(64) not null,
			password nvarchar(64),
			phone nchar(10) not null,
			gender nvarchar(8),
			isLocked bit not null default(0),
			dob date not null,
			address nvarchar(128) not null,

			constraint [Patient name is required.]
				check(len(name) > 0),
			constraint [Patient phone must contain only digits and have a length of 10.]
				check(isnumeric(phone) = 1 and len(phone) = 10),
			constraint [Patient gender must be null, 'male' or 'female'.]
				check(gender is null or gender in ('male', 'female')),
			constraint [Patient DOB must be before today.]
				check(dob < getdate()),
			constraint [Patient address is required.]
				check(len(address) > 0),
			constraint [A patient with this phone number already exists.]
				unique(phone),
			constraint [Patient password must contain lowercases, uppercases and digits and must be at least 8 long.]
				check(
					password is null or
					(len(password) >= 8 and password like '%[0-9]%' and password like '%[a-z]%' and password like '%[A-Z]%')
				)
		)

		create table dentist(
			id uniqueidentifier default(newid()) primary key,
			name nvarchar(64) not null,
			password nvarchar(64) not null,
			phone nchar(10) not null,
			gender nvarchar(8),
			isLocked bit not null default(0),

			constraint [Dentist name is required.]
				check(len(name) > 0),
			constraint [Dentist phone must contain only digits and have a length of 10.]
				check(isnumeric(phone) = 1 and len(phone) = 10),
			constraint [Dentist gender must be null, 'male' or 'female'.]
				check(gender is null or gender in ('male', 'female')),
			constraint [A dentist with this phone number already exists.]
				unique(phone),
			constraint [Dentist password must contain lowercases, uppercases and digits and must be at least 8 long.]
				check(len(password) >= 8 and password like '%[0-9]%' and password like '%[a-z]%' and password like '%[A-Z]%')
		)

		create table dentistSchedule(
			dentistId uniqueidentifier not null foreign key references dentist(id),
			shift nvarchar(16) not null,
			date int not null,

			constraint [A dentist schedule of this dentist at this date and shift already exists.]
				primary key(dentistId, shift, date),
			constraint [Dentist schedule shift must be 'morning', 'afternoon' or 'evening'.]
				check(shift in ('morning', 'afternoon', 'evening')),
			constraint [Dentist schedule date must be between 1 (Sunday) and 7 (Saturday).]
				check(1 <= date and date <= 7)
		)

		create table appointment(
			dentistId uniqueidentifier not null foreign key references dentist(id),
			patientId uniqueidentifier not null foreign key references patient(id),
			shift nvarchar(16) not null,
			date date not null,
			status nvarchar(16) not null,

			constraint [An appointment with this dentist at this date and shift already exists.]
				primary key(dentistId, shift, date),
			constraint [An appointment with this patient at this date and shift already exists.]
				unique(patientId, shift, date),
			constraint [Appointment shift must be 'morning', 'afternoon' or 'evening'.]
				check(shift in ('morning', 'afternoon', 'evening')),
			constraint [Appointment status must be 'pending', 'confirmed' or 'cancelled'.]
				check(status in ('pending', 'confirmed', 'cancelled'))
		)

		create table service(
			id uniqueidentifier default(newid()) primary key,
			name nvarchar(64) not null,
			description nvarchar(1024) not null,
			price int not null,

			constraint [Service name is required.]
				check(len(name) > 0),
			constraint [A service with this name already exists.]
				unique(name),
			constraint [Service price must be positive.]
				check(price > 0)
		)

		create table drug(
			id uniqueidentifier default(newid()) primary key,
			name nvarchar(64) not null,
			directive nvarchar(512) not null,
			price int not null,
			unit nvarchar(64) not null,

			constraint [Drug name is required.]
				check(len(name) > 0),
			constraint [A drug with this name already exists.]
				unique(name),
			constraint [Drug price must be positive.]
				check(price > 0),
			constraint [Drug unit is required.]
				check(len(unit) > 0)
		)

		create table drugBatch(
			drugId uniqueidentifier not null foreign key references drug(id),
			expirationDate date not null,
			import int not null,
			isRemoved bit not null default(0),
			stock int not null default(0),

			constraint [Stock must be between import and 0.]
				check(import >= stock and stock >= 0),

			constraint [A drug batch with this drug and expiration date already exists.]
				primary key(drugId, expirationDate),
			constraint [Drug import must be positive.]
				check(import > 0)
		)

		create table prescribedDrug(
			prescriptionId uniqueidentifier not null,
			drugId uniqueidentifier not null,
			expirationDate date not null,
			dosage nvarchar(64) not null,
			quantity float not null,

			constraint [This prescription already contains the prescribed drug from this batch.]
				primary key(prescriptionId, drugId, expirationDate),
			constraint [Prescribed drug dosage is required.]
				check(len(dosage) > 0),
			constraint [Prescribed drug quantity must be positive.]
				check(quantity > 0)
		)

		alter table prescribedDrug
			add foreign key (drugId, expirationDate)
			references drugBatch(drugId, expirationDate)

		create table prescription(
			id uniqueidentifier default(newid()) primary key,
			total int not null default(0)
		)

		alter table prescribedDrug
			add foreign key (prescriptionId) references prescription(id)

		create table treatedService(
			treatmentId uniqueidentifier not null,
			serviceId uniqueidentifier not null foreign key references service(id),

			constraint [This treatment already contains this treated service.]
				primary key(treatmentId, serviceId)
		)

		create table treatment(
			id uniqueidentifier default(newid()) primary key,
			saved bit not null default(0),

			dentistId uniqueidentifier not null foreign key references dentist(id),
			shift nvarchar(16) not null check(shift in ('morning', 'afternoon', 'evening')),
			date date not null,

			prescriptionId uniqueidentifier foreign key references prescription(id),

			symptoms nvarchar(64) not null,
			notes nvarchar(64) not null,
			toothTreated nvarchar(64) not null,
			outcome nvarchar(16) not null,
			treatmentCharge int not null,
			totalServiceCharge int not null default(0),

			constraint [Treatment shift must be 'morning', 'afternoon' or 'evening'.]
				check(shift in ('morning', 'afternoon', 'evening')),
			constraint [Treatment charge must be positive.]
				check(treatmentCharge > 0)
		)

		alter table treatment
			add foreign key (dentistId, shift, date)
			references appointment(dentistId, shift, date)

		alter table treatedService
			add foreign key (treatmentId) references treatment(id)

		create table invoice(
			id uniqueidentifier default(newid()) primary key,
			treatmentId uniqueidentifier not null foreign key references treatment(id),
			issueDate date not null default(getdate()),
			total int not null

			constraint [Total must be positive.]
				check(total > 0)
		)
	end try
	begin catch
		throw
	end catch
commit tran

go
exec _createTables
go

create or alter proc getUserByCred with execute as owner
as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getPatientsByPhone as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createPatient as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createGuestPatient as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createStaff as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createDentist as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc lockUser as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc unlockUser as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDentists as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDentistDetails as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDentistSchedules as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDentistAppointments as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getUsers as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc bookAppointment as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDentistsOnShift as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc updatePatient as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getPatientDetails as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc addDentistSchedule as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc removeDentistSchedule as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDrugs as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDrugDetails as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getServices as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getServiceDetails as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createDrug as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc updateDrug as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc deleteDrug as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc addDrugBatch as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc removeDrugBatch as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createInvoice as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createTreatment as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc saveTreatment as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc addServiceToTreatment as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc addDrugToTreatment as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc _createServerUsers as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if not exists (select loginname from master.dbo.syslogins where name = 'guest')
			create login guest with password = 'guest'

		if not exists (select loginname from master.dbo.syslogins where name = 'patient')
			create login patient with password = 'patient'

		if not exists (select loginname from master.dbo.syslogins where name = 'dentist')
			create login dentist with password = 'dentist'

		if not exists (select loginname from master.dbo.syslogins where name = 'staff')
			create login staff with password = 'staff'

		if not exists (select loginname from master.dbo.syslogins where name = 'admin')
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
		grant exec on dbo.createGuestPatient to guests
		grant exec on dbo.getDentists to guests
		grant exec on dbo.getDentistSchedules to guests
		grant exec on dbo.getDentistAppointments to guests
		grant exec on dbo.getDentistDetails to guests
		grant exec on dbo.bookAppointment to guests
		grant exec on dbo.getDentistsOnShift to guests
		grant exec on dbo.getServices to guests
		grant exec on dbo.getServiceDetails to guests

		grant exec on dbo.getDentists to patients
		grant exec on dbo.getDentistSchedules to patients
		grant exec on dbo.getDentistAppointments to patients
		grant exec on dbo.getDentistDetails to patients
		grant exec on dbo.bookAppointment to patients
		grant exec on dbo.getDentistsOnShift to patients
		grant exec on dbo.getServices to patients
		grant exec on dbo.getServiceDetails to patients
		grant exec on dbo.getUserByCred to patients

		grant exec on dbo.getPatientsByPhone to dentists
		grant exec on dbo.getPatientDetails to dentists
		grant exec on dbo.updatePatient to dentists
		grant exec on dbo.getDentistDetails to dentists
		grant exec on dbo.getServices to dentists
		grant exec on dbo.getServiceDetails to dentists
		grant exec on dbo.getDrugs to dentists
		grant exec on dbo.getDrugDetails to dentists
		grant exec on dbo.createTreatment to dentists
		grant exec on dbo.addServiceToTreatment to dentists
		grant exec on dbo.addDrugToTreatment to dentists
		grant exec on dbo.saveTreatment to dentists

		grant exec on dbo.createGuestPatient to staffs
		grant exec on dbo.getPatientsByPhone to staffs
		grant exec on dbo.getPatientDetails to staffs
		grant exec on dbo.getServices to staffs
		grant exec on dbo.getServiceDetails to staffs
		grant exec on dbo.getDentists to staffs
		grant exec on dbo.getDentistSchedules to staffs
		grant exec on dbo.getDentistAppointments to staffs
		grant exec on dbo.getDentistDetails to staffs
		grant exec on dbo.bookAppointment to staffs
		grant exec on dbo.getDentistsOnShift to staffs
		grant exec on dbo.createInvoice to staffs
		grant exec on dbo.getDrugs to staffs
		grant exec on dbo.getDrugDetails to staffs

		grant exec on dbo.getDrugs to admins
		grant exec on dbo.getDrugDetails to admins
		grant exec on dbo.createDrug to admins
		grant exec on dbo.updateDrug to admins
		grant exec on dbo.deleteDrug to admins
		grant exec on dbo.addDrugBatch to admins
		grant exec on dbo.removeDrugBatch to admins
		grant exec on dbo.createStaff to admins
		grant exec on dbo.createDentist to admins
		grant exec on dbo.getUsers to admins
		grant exec on dbo.lockUser to admins
		grant exec on dbo.unlockUser to admins

		grant exec on dbo.updatePatient to patients
		grant exec on dbo.getPatientDetails to patients
		grant exec on dbo.getDentistSchedules to dentists
		grant exec on dbo.getDentistAppointments to dentists
		grant exec on dbo.addDentistSchedule to dentists
		grant exec on dbo.removeDentistSchedule to dentists
	end try
	begin catch
		throw
	end catch
commit tran

go
exec _createServerUsers
go