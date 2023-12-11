use DMS
go
set datefirst 7
go

create or alter proc getUserByCred(
	@phone nchar(10),
	@password nvarchar(64),
	@role nvarchar(16)
)
with execute as owner
as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @phone is null or @password is null or @role is null
		begin;
			throw 51000, 'Phone, password and role are required.', 1
		end

		if @role != 'admin'
		begin
			declare @sql nvarchar(128), @isLocked bit

			set @sql = '
				select @isLocked = isLocked from ' + quotename(@role) + '
				where phone = @phone and password = @password
			'
			exec sp_executesql @sql,
				N'@phone nchar(10), @password nvarchar(64), @isLocked bit output',
				@phone = @phone, @password = @password, @isLocked = @isLocked output

			if @isLocked = 1
			begin;
				throw 51000, 'This account is currently locked.', 1
			end
		end

		set @sql = '
			select * from ' + quotename(@role) + '
			where phone = @phone and password = @password
		'
		exec sp_executesql @sql,
			N'@phone nchar(10), @password nvarchar(64)',
			@phone = @phone, @password = @password
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getPatientsByPhone(@phone nchar(10)) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @phone is null
		begin;
			throw 51000, 'Phone is required.', 1
		end

		if not exists(
			select * from patient
			where phone like (cast(trim(@phone) as nvarchar(11)) + '%')
		)
		begin;
			throw 51000, 'No patient found.', 1
		end

		select name, phone, gender, dob, address from patient
		where phone like (cast(trim(@phone) as nvarchar(11)) + '%')
	end try
	begin catch
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
	set xact_abort on
	set nocount on

	begin try
		if @name is null or @password is null or @phone is null or @gender is null or @dob is null or @address is null
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		if exists(select * from patient where phone = @phone and password is null)
		begin
			update patient
			set name = @name, password = @password, gender = @gender, dob = @dob, address = @address
			where phone = @phone and password is null
		end
		else
		begin
			insert into patient(name, password, phone, gender, dob, address)
			values (@name, @password, @phone, @gender, @dob, @address)
		end

		select name, phone, gender, dob, address from patient where phone = @phone
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createGuestPatient(
	@name nvarchar(64),
	@phone nchar(10),
	@gender nvarchar(8),
	@dob date,
	@address nvarchar(128)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @name is null or @phone is null or @gender is null or @dob is null or @address is null
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		if exists(select * from patient where phone = @phone and password is null)
		begin
			update patient
			set name = @name, gender = @gender, dob = @dob, address = @address
			where phone = @phone and password is null
		end
		else
		begin
			insert into patient(name, phone, gender, dob, address)
			values (@name, @phone, @gender, @dob, @address)
		end

		select name, phone, gender, dob, address from patient where phone = @phone
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createStaff(
	@name nvarchar(64),
	@password nvarchar(64),
	@phone nchar(10),
	@gender nvarchar(8)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@name is null or @password is null or @phone is null or @gender is null)
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		insert into staff(name, password, phone, gender)
		values (@name, @password, @phone, @gender)

		select * from staff where phone = @phone
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createDentist(
	@name nvarchar(64),
	@password nvarchar(64),
	@phone nchar(10),
	@gender nvarchar(8)
) as
begin tran
	set xact_abort on
	set nocount on
	begin try
		if (@name is null or @password is null or @phone is null or @gender is null)
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		insert into dentist (name, password, phone, gender)
		values (@name, @password, @phone, @gender)

		select * from dentist where phone = @phone
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc lockUser(
	@phone nchar(10),
	@role nvarchar(16)
)
with execute as owner
as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@phone is null or @role is null)
		begin;
			throw 51000, 'Phone and role are required.', 1
		end

		if (@role = 'admin')
		begin;
			throw 51000, 'Cannot lock an admin.', 1
		end

		declare @sql nvarchar(256) = '
			if not exists(select * from ' + quotename(@role) + ' where phone = @phone)
			begin;
				throw 51000, ''User does not exist.'', 1
			end

			update ' + quotename(@role) + '
			set isLocked = 1
			where phone = @phone
		'
		exec sp_executesql @sql,
			N'@phone nchar(10), @role nvarchar(16)',
			@phone = @phone, @role = @role
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc unlockUser(
	@phone nchar(10),
	@role nvarchar(16)
)
with execute as owner
as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@phone is null or @role is null)
		begin;
			throw 51000, 'Phone and role are required.', 1
		end

		if (@role = 'admin')
		begin;
			throw 51000, 'Cannot unlock an admin.', 1
		end

		declare @sql nvarchar(256) = '
			if not exists(select * from ' + quotename(@role) + ' where phone = @phone)
			begin;
				throw 51000, ''User does not exist.'', 1
			end

			update ' + quotename(@role) + '
			set isLocked = 0
			where phone = @phone
		'
		exec sp_executesql @sql,
			N'@phone nchar(10), @role nvarchar(16)',
			@phone = @phone, @role = @role
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
		if not exists(select * from dentist)
		begin;
			throw 51000, 'No dentist found.', 1
		end

		select id from dentist
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDentistDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@id is null)
		begin;
			throw 51000, 'Id is required.', 1
		end

		if not exists (select * from dentist where id = @id)
		begin;
			throw 51000, 'Dentist does not exist.', 1
		end

		select id, name, phone, gender from dentist where id = @id
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDentistSchedules(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@id is null)
		begin;
			throw 51000, 'Id is required.', 1
		end

		if not exists (select * from dentist where id = @id)
		begin;
			throw 51000, 'Dentist does not exist.', 1
		end

		if not exists (select * from dentistSchedule where dentistId = @id)
		begin;
			throw 51000, 'Dentist does not have any schedule.', 1
		end

		select * from dentistSchedule where dentistId = @id
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDentistAppointments(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@id is null)
		begin;
			throw 51000, 'Id is required.', 1
		end

		if not exists (select * from dentist where id = @id)
		begin;
			throw 51000, 'Dentist does not exist.', 1
		end

		if not exists (select * from appointment where dentistId = @id)
		begin;
			throw 51000, 'Dentist does not have any appointment.', 1
		end

		select * from appointment where dentistId = @id
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getUsers(@phone nchar(10)) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @phone is null
		begin;
			throw 51000, 'Phone is required.', 1
		end

		select * into #user from (
			select id, phone, name, isLocked, 'patient' as role from patient
			where phone like (cast(trim(@phone) as nvarchar(11)) + '%')
			union all
			select id, phone, name, isLocked, 'dentist' as role from dentist
			where phone like (cast(trim(@phone) as nvarchar(11)) + '%')
			union all
			select id, phone, name, isLocked, 'staff' as role from staff
			where phone like (cast(trim(@phone) as nvarchar(11)) + '%')
		) as [user]

		if not exists(select * from #user)
		begin;
			throw 51000, 'No user found.', 1
		end

		select * from #user
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc bookAppointment(
	@dentistId uniqueidentifier,
	@patientId uniqueidentifier,
	@shift nvarchar(16),
	@date date
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @dentistId is null or @patientId is null or @shift is null or @date is null
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		if not exists (select * from patient where id = @patientId)
		begin;
			throw 51000, 'Patient does not exist.', 1
		end

		if not exists (select * from dentist where id = @dentistId)
		begin;
			throw 51000, 'Dentist does not exist.', 1
		end

		if not exists (
			select * from dentistSchedule
			where dentistId = @dentistId and shift = @shift and date = datepart(dw, @date)
		)
		begin;
			throw 51000, 'Appointment must take place during the schedule of this dentist.', 1
		end

		insert into appointment values(@dentistId, @patientId, @shift, @date, 'pending')

		select * from appointment
		where dentistId = @dentistId and shift = @shift and date = @date
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDentistsOnShift(
	@date date,
	@shift nvarchar(16)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @date is null or @shift is null
		begin;
			throw 51000, 'Date and shift are required.', 1
		end

		select id, name, phone, gender into #dentistOnShift from dentist
		join dentistSchedule ds on id = dentistId
		where shift = @shift and date = datepart(dw, @date) and not exists(
			select * from appointment
			where dentistId = ds.dentistId and shift = @shift and date = @date
		)

		if not exists(select * from #dentistOnShift)
		begin;
			throw 51000, 'No dentist found.', 1
		end

		select * from #dentistOnShift
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc updatePatient(
	@id uniqueidentifier,
	@name nvarchar(64),
	@phone nchar(10),
	@gender nvarchar(8),
	@dob date,
	@address nvarchar(128)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @id is null or @name is null or @phone is null or @gender is null or @dob is null or @address is null
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		if not exists (select * from patient where id = @id)
		begin;
			throw 51000, 'Patient does not exist.', 1
		end

		update patient
		set name = @name, phone = @phone, gender = @gender, dob = @dob, address = @address
		where id = @id

		select id, name, phone, gender, dob, address from patient where id = @id
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getPatientDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @id is null
		begin;
			throw 51000, 'Id is required.', 1
		end

		if not exists (select * from patient where id = @id)
		begin;
			throw 51000, 'Patient does not exist.', 1
		end

		select
			p.name as [patient.name],
			p.dob as [patient.dob],
			p.phone as [patient.phone],
			p.gender as [patient.gender],
			p.address as [patient.address],
			(
		 		select t.shift, t.date, t.toothTreated, t.notes, t.treatmentCharge,
				(
					select d.name, d.phone, d.gender from dentist d
					where t.dentistId = d.id
					for json path, include_null_values
				) as [dentist],
				(
					select s.name, s.price from treatedService ts
					join service s on s.id = ts.serviceId
					where ts.treatmentId = t.id
					for json path, include_null_values
				) as [services],
				(
					select d.id, d.name, d.price, d.unit, pd.quantity, pd.dosage, pd.expirationDate from prescription ps
					join prescribedDrug pd on pd.prescriptionId = ps.id
					join drug d on d.id = pd.drugId
					where t.prescriptionId = ps.id
					for json path, include_null_values
				) as [drugs]
				from treatment t
				join appointment a on
					a.patientId = p.id and t.dentistId = a.dentistId and
					t.shift = a.shift and t.date = a.date
				for json path, include_null_values
			) as [treatments]
		from patient p
		where p.id = @id
		for json path, include_null_values
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc addDentistSchedule(
	@id uniqueidentifier,
	@date int,
	@shift nvarchar(16)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@id is null or @date is null or @shift is null)
		begin;
			throw 51000, 'Id, date and shift are required.', 1
		end

		if not exists(select * from dentist where id = @id)
		begin;
			throw 51000, 'Dentist does not exist.', 1
		end

		insert into dentistSchedule values (@id, @shift, @date)

		select * from dentistSchedule where dentistId = @id and shift = @shift and date = @date
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc removeDentistSchedule(
	@id uniqueidentifier,
	@date int,
	@shift nvarchar(16)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@id is null or @date is null or @shift is null)
		begin;
			throw 51000, 'Id, date and shift are required.', 1
		end

		if not exists(select * from dentist where id = @id)
		begin;
			throw 51000, 'Dentist does not exist.', 1
		end

		if not exists(
			select * from dentistSchedule where dentistId = @id and date = @date and shift = @shift
		)
		begin;
			throw 51000, 'Schedule does not exist.', 1
		end

		if exists(
			select * from appointment where
				dentistId = @id and datepart(dw, date) = @date and shift = @shift
		)
		begin;
			throw 51000, 'This schedule cannot be deleted as it is currently in use by at least one appointment.', 1
		end

		delete from dentistSchedule
		where dentistId = @id and date = @date and shift = @shift

		select * from dentistSchedule where dentistId = @id
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDrugs(@name nvarchar(64)) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @name is null
		begin;
			throw 51000, 'Name is required.', 1
		end

		if not exists(
			select * from drug
			where name like (cast(trim(@name) as nvarchar(65)) + '%')
		)
		begin;
			throw 51000, 'No drug found.', 1
		end

		select id, name from drug
		where name like (cast(trim(@name) as nvarchar(65)) + '%')
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getDrugDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@id is null)
		begin;
			throw 51000, 'Id is required.', 1
		end

		if not exists(select * from drug where id = @id)
		begin;
			throw 51000, 'Drug does not exist.', 1
		end

		select
			d.id, d.name, d.directive, d.price, d.unit,
			(
				select db.stock, db.expirationDate from drugBatch db
				where db.drugId = d.id and db.isRemoved = 0
				order by db.expirationDate
				for json path, include_null_values
			) as [drugBatches]
		from drug d
		where d.id = @id
		for json path, include_null_values
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
		if not exists(select * from service)
		begin;
			throw 51000, 'No service found.', 1
		end

		select id, name from service
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc getServiceDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@id is null)
		begin;
			throw 51000, 'Id is required.', 1
		end

		if not exists(select * from service where id = @id)
		begin;
			throw 51000, 'Service does not exist.', 1
		end

		select * from service where id = @id
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createDrug(
	@name nvarchar(64),
	@directive nvarchar(512),
	@price int,
	@unit nvarchar(64)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@name is null or @directive is null or @price is null or @unit is null)
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		insert into drug (name, directive, price, unit) values (@name, @directive, @price, @unit)

		select * from drug where name = @name
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc updateDrug(
	@id uniqueidentifier,
	@name nvarchar(64),
	@directive nvarchar(512),
	@price int,
	@unit nvarchar(64)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@id is null or @name is null or @directive is null or @price is null or @unit is null)
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		if not exists(select * from drug where id = @id)
		begin;
			throw 51000, 'Drug does not exist.', 1
		end

		declare @oldPrice int = (select price from drug where id = @id)

		update drug
		set name = @name, directive = @directive, price = @price, unit = @unit
		where id = @id

		update prescription
		set total += (@price - @oldPrice) * (
			select coalesce(sum(quantity), 0) from prescribedDrug
			where prescriptionId = id and drugId = @id
		)

		select * from drug where id = @id
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc deleteDrug(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@id is null)
		begin;
			throw 51000, 'Id is required.', 1
		end

		if not exists(select * from drug where id = @id)
		begin;
			throw 51000, 'Drug does not exist.', 1
		end

		delete from drug where id = @id

		select * from drug
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc addDrugBatch(
	@drugId uniqueidentifier,
	@exp date,
	@import int
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@drugId is null or @exp is null or @import is null)
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		if not exists(select * from drug where id = @drugId)
		begin;
			throw 51000, 'Drug does not exist.', 1
		end

		if (@exp < getdate())
		begin;
			throw 51000, 'Drug batch has already expired.', 1
		end

		insert into drugBatch(drugId, expirationDate, import, stock) values (@drugId, @exp, @import, @import)

		select * from drugBatch where drugId = @drugId and expirationDate = @exp
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc removeDrugBatch(
	@drugId uniqueidentifier,
	@exp date
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@drugId is null or @exp is null)
		begin;
			throw 51000, 'Drug id and expiration date are required.', 1
		end

		if not exists(select * from drugBatch where drugId = @drugId and expirationDate = @exp and isRemoved = 0)
		begin;
			throw 51000, 'Drug batch does not exist.', 1
		end

		update drugBatch set isRemoved = 1
		where drugId = @drugId and expirationDate = @exp

		select * from drugBatch where drugId = @drugId
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createInvoice(@treatmentId uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @treatmentId is null
		begin;
			throw 51000, 'Treatment id is required.', 1
		end

		if not exists(select * from treatment where id = @treatmentId)
		begin;
			throw 51000, 'Treatment does not exist.', 1
		end

		if (select date from treatment where id = @treatmentId) >= getdate()
		begin;
			throw 51000, 'Invoice must be issued after treatment.', 1
		end

		declare @total int, @prescriptionId uniqueidentifier
		select
			@total = (treatmentCharge + totalServiceCharge),
			@prescriptionId = prescriptionId
		from treatment where id = @treatmentId

		if @prescriptionId is not null
		begin
			select @total += total from prescription where id = @prescriptionId
		end

		if exists(select * from invoice where treatmentId = @treatmentId and total != @total)
		begin;
			throw 51000, 'Invoice is no longer valid as prices have changed.', 1
		end

		insert into invoice(treatmentId, total) values (@treatmentId, @total)

		select * from invoice where treatmentId = @treatmentId and issueDate = convert(date, getdate())
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc createTreatment(
	@dentistId uniqueidentifier,
	@shift nvarchar(16),
	@date date,
	@symptoms nvarchar(64),
	@notes nvarchar(64),
	@toothTreated nvarchar(64),
	@outcome nvarchar(16),
	@treatmentCharge int
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (
			@dentistId is null or @shift is null or @date is null or
			@symptoms is null or @notes is null or @toothTreated is null or @outcome is null or @treatmentCharge is null
		)
		begin;
			throw 51000, 'All parameters are required.',1
		end

		if not exists(select * from dentist where id = @dentistId)
		begin;
			throw 51000, 'Denstist does not exist.', 1
		end

		if not exists(select * from appointment where dentistId = @dentistId and shift = @shift and date = @date)
		begin;
			throw 51000, 'Appointment does not exist.', 1
		end

		insert into treatment(dentistId, shift, date, symptoms, notes, toothTreated, outcome, treatmentCharge)
		values (@dentistId, @shift, @date, @symptoms, @notes, @toothTreated, @outcome, @treatmentCharge)

		select * from treatment where dentistId = @dentistId and shift = @shift and date = @date
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc addServiceToTreatment(
	@treatmentId uniqueidentifier,
	@serviceId uniqueidentifier
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@treatmentId is null or @serviceId is null)
		begin;
			throw 51000, 'Treatment id and service id are required.', 1
		end

		if not exists(select * from treatment where id = @treatmentId)
		begin;
			throw 51000, 'Treatment does not exist.', 1
		end

		if exists(select * from invoice where treatmentId = @treatmentId)
		begin;
			throw 51000, 'Treatment cannot be altered as it has already been invoiced.', 1
		end

		if not exists(select * from service where id = @serviceId)
		begin;
			throw 51000, 'Service does not exist.', 1
		end

		insert into treatedService values (@treatmentId, @serviceId)

		update treatment
		set totalServiceCharge += (select price from service where id = @serviceId)
		where id = @treatmentId

		select ts.treatmentId, ts.serviceId, s.name
		from treatedService ts
		join service s on s.id = ts.serviceId
		where treatmentId = @treatmentId
	end try
	begin catch
		throw
	end catch
commit tran

go

create or alter proc addDrugToTreatment(
	@treatmentId uniqueidentifier,
	@drugId uniqueidentifier,
	@expirationDate date,
	@dosage nvarchar(64),
	@quantity int
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@treatmentId is null or @drugId is null or @expirationDate is null or @dosage is null or @quantity is null)
		begin;
			throw 51000, 'All parameters are required.', 1
		end

		if not exists(select * from treatment where id = @treatmentId)
		begin;
			throw 51000, 'Treatment does not exist.', 1
		end

		if exists(select * from invoice where treatmentId = @treatmentId)
		begin;
			throw 51000, 'Treatment cannot be altered as it has already been invoiced.', 1
		end

		if not exists(select * from drug where id = @drugId)
		begin;
			throw 51000, 'Drug does not exist.', 1
		end

		if not exists(select * from drugBatch where drugId = @drugId and expirationDate = @expirationDate)
		begin;
			throw 51000, 'Drug batch does not exist.', 1
		end

		declare @import int, @stock int, @isRemoved bit
		select
			@import = import,
			@stock = stock,
			@isRemoved = isRemoved
		from drugBatch where drugId = @drugId and expirationDate = @expirationDate

		if @stock - @quantity < 0 or @isRemoved = 1
		begin;
			throw 51000, 'The prescribed drug is either out of stock or is removed.', 1
		end

		declare @presId uniqueidentifier
		declare @tempTable table (id uniqueidentifier)

		select @presId = prescriptionId from treatment
		where id = @treatmentId

		if @presId is null
		begin
			insert into prescription
			output inserted.id into @tempTable
			default values
			select @presId = id from @tempTable

			update treatment
			set prescriptionId = @presId
			where id = @treatmentId
		end

		insert into prescribedDrug(prescriptionId, drugId, expirationDate, dosage, quantity) values
			(@presId, @drugId, @expirationDate, @dosage, @quantity)

		update drugBatch
		set stock -= @quantity
		where drugId = @drugId and expirationDate = @expirationDate

		update prescription
		set total += @quantity * (select price from drug where id = @drugId)
		where id = @presId

		select pd.*, d.name from prescribedDrug pd
		join drug d on d.id = pd.drugId
		where prescriptionId = @presId
	end try
	begin catch
		throw
	end catch
commit tran

go