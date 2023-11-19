use DMS
go
set datefirst 7
go

create or alter trigger _onDentistScheduleDelete
on dentistSchedule instead of delete as
begin
	set xact_abort on
	set nocount on

	if exists(
		select * from deleted d
		inner join dentistSchedule ds on
			ds.dentistId = d.dentistId and
			ds.shift = d.shift and ds.date = d.date
		join appointment a on
			a.dentistId = ds.dentistId and
			datepart(dw, a.date) = ds.date and
			a.shift = ds.shift
	)
	begin
		rollback tran;
		throw 51000, 'This dentist schedule cannot be deleted as it is currently in use by at least one appointment.', 1
	end

	delete dentistSchedule from deleted d inner join dentistSchedule ds on
		ds.dentistId = d.dentistId and
		ds.date = d.date and ds.shift = d.shift
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
	set xact_abort on
	set nocount on

	begin try
		declare @sql nvarchar(128) =
			'select * from ' + @role + ' where phone = @phone and password = @password'

		exec sp_executesql @sql,
			N'@phone nchar(10), @password nvarchar(64)',
			@phone = @phone, @password = @password
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

create or alter proc getPatientByPhone(@phone nchar(10)) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @phone is null 
		begin 
			rollback tran;
			throw 51000, 'Phone number cannot be null.', 1
		end

		if not exists (select 1 from PATIENT where phone = @phone) 
		begin 
			rollback tran;
			throw 51000, 'This patient does not exist in the database.', 1
		end

		select id, name, phone, gender, dob, address from PATIENT where phone = @phone 
	end try
	begin catch
		if @@TRANCOUNT > 0
      rollback tran;
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
		begin 
			rollback tran;
			throw 51000, 'Input cannot be null.', 1
		end

		insert into patient(name, password, phone, gender, dob, address)
			values (@name, @password, @phone, @gender, @dob, @address)

		select name, phone, gender, dob, address from patient where phone = @phone
	end try
	begin catch
		if @@TRANCOUNT > 0
      rollback tran;
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
		begin 
			rollback tran;
			throw 51000, 'Input cannot be null.', 1
		end

		declare @password nvarchar(64) = 'guestdms@123'
		insert into patient(name, password, phone, gender, dob, address)
		values (@name, @password, @phone, @gender, @dob, @address)

		select name, phone, gender, dob, address from patient where phone = @phone
	end try
	begin catch
		if @@TRANCOUNT > 0
      rollback tran;
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
		if @@TRANCOUNT > 0
        rollback tran;
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
		rollback tran;
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
		rollback tran;
		throw
	end catch
commit tran

go

create or alter proc getDentists as
begin tran
	set xact_abort on
	set nocount on

	begin try
		select id, name, phone, gender from DENTIST
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

create or alter proc getDentistDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @id is null 
		begin 
			rollback tran;
			throw 51000, 'ID cannot be null.', 1
		end
		
		if not exists (select 1 from dentist where id = @id)
		begin 
			rollback tran;
			throw 51000, 'This dentist does not exist in the database.', 1;
		end

		select id, name, phone, gender, shift, date
		from DENTIST join DENTISTSCHEDULE on id = dentistId
		where id = @id
	end try
	begin catch
		if @@TRANCOUNT > 0
       rollback tran;
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
		begin 
			rollback tran;
			throw 51000, 'Input cannot be null.', 1
		end

		if not exists (select 1 from PATIENT where id = @patientId) 
		begin 
			rollback tran;
			throw 51000, 'This patient does not exist in the database.', 1
		end

		if not exists (select 1 from DENTIST where id = @dentistId) 
		begin 
			rollback tran;
			throw 51000, 'This dentist does not exist in the database.', 1
		end

		if not exists (
			select 1 
			from DENTISTSCHEDULE 
			where dentistId = @dentistId and shift = @shift and date = datepart(dw, @date)
		)
		begin 
			rollback tran;
			throw 51000, 'This dentist is not available on this shift.', 1
		end

		declare @status nvarchar(16) = 'pending'
		insert into APPOINTMENT values(@dentistId, @patientId, @shift, @date, @status)

		select p.id, p.name, d.id, d.name, a.shift, a.date 
		from PATIENT p 
		join APPOINTMENT a on p.id = a.patientId
		join DENTIST d on d.id = a.dentistId
		where p.id = @patientId and a.shift = @shift and a.date = @date
	end try
	begin catch
		if @@TRANCOUNT > 0
      rollback tran;
		throw
	end catch
commit tran

go

create or alter proc getDentistsOnShift(
	@date int,
	@shift nvarchar(16)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @date is null or @shift is null
		begin 
			rollback tran;
			throw 51000, 'Input cannot be null.', 1
		end

		if not exists (
			select 1 
			from DENTIST join DENTISTSCHEDULE on id = dentistId
			where shift = @shift and date = @date  
		)
		begin 
			rollback tran;
			throw 51000, 'There are no dentists available on this shift.', 1;
		end

		select id, name, phone, gender 
		from DENTIST join DENTISTSCHEDULE on id = dentistId
		where shift = @shift and date = @date  
	end try
	begin catch
		if @@TRANCOUNT > 0
      rollback tran;
		throw
	end catch
commit tran

go

create or alter proc updatePatient(
	@id uniqueidentifier,
	@name nvarchar(64),
	@gender nvarchar(8),
	@dob date,
	@address nvarchar(128)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @id is null or @name is null or @gender is null or @dob is null or @address is null
		begin 
			rollback tran;
			throw 51000, 'Input cannot be null.', 1
		end
	
		if not exists (select 1 from PATIENT where id = @id)
		begin 
			rollback tran;
			throw 51000, 'This patient does not exist in the database.', 1
		end 

		update PATIENT
		set name = @name, gender = @gender, dob = @dob, address = @address 
		where id = @id 
	end try
	begin catch
		if @@TRANCOUNT > 0
      rollback tran;
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
		begin 
			rollback tran;
			throw 51000, 'ID cannot be null.', 1
		end

		if not exists (select 1 from PATIENT where id = @id)
		begin 
			rollback tran;
			throw 51000, 'This patient does not exist in the database.', 1
		end

		if not exists (select 1 from APPOINTMENT where patientId = @id)
		begin 
			rollback tran;
			throw 51000, 'This patient does not have any appointments.', 1
		end

		select p.name, p.dob, p.phone, p.gender, p.address,
		 				dentist.name, t.shift, t.date, t.symptoms, t.notes, t.toothTreated, t.outcome,
						drug.name, pd.dosage, pd.quantity, s.name, s.description  
		from PATIENT p 
		join APPOINTMENT a on a.patientId = p.id
		join TREATMENT t on t.dentistId = a.dentistId and t.shift = a.shift and t.date = a.date 
		join DENTIST dentist on dentist.id = t.dentistId 
		join PRESCRIPTION pres on pres.id = t.prescriptionId
		join PRESCRIBEDDRUG pd on pd.prescriptionId = pres.id
		join DRUG drug on drug.id = pd.drugId
		join TREATEDSERVICE ts on ts.treatmentId = t.id  
		join SERVICE s on s.id = ts.serviceId
		where p.id = @id 

	end try
	begin catch
		if @@TRANCOUNT > 0
      rollback tran;
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
		rollback tran;
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
		rollback tran;
		throw
	end catch
commit tran

go

create or alter proc getDrugs as
begin tran
	set xact_abort on
	set nocount on

	begin try
		select id, name, price, unit, directive, db.stock, db.expirationDate 
		from DRUG d join DRUGBATCH db on drugId = id 
	end try
	begin catch
		if @@TRANCOUNT > 0
        rollback tran;
		throw
	end catch
commit tran

go

create or alter proc getDrugDetails(@name uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @name is null
		begin 
			rollback tran;
			throw 51000, 'Name cannot be null.', 1
		end
	
		if not exists (select 1 from drug where name = @name) 
		begin 
			rollback tran;
			throw 51000, 'This drug does not exist in the database.', 1
		end

		select id, name, price, unit, directive, db.stock, db.expirationDate 
		from DRUG d join DRUGBATCH db on drugId = id 
		where d.name = @name
	end try
	begin catch
		if @@TRANCOUNT > 0
        rollback tran;
		throw
	end catch
commit tran
go

create or alter proc getServices as
begin tran
	set xact_abort on
	set nocount on

	begin try
		select id, name from SERVICE
	end try
	begin catch
		if @@TRANCOUNT > 0
      	rollback tran;
		throw
	end catch
commit tran

go

create or alter proc getServiceDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @id is null
		begin 
			rollback tran;
			throw 51000, 'ID cannot be null.', 1
		end

		if not exists (select 1 from SERVICE where id = @id)
		begin 
			rollback tran;
			throw 51000, 'This service does not exist in the database.', 1
		end

		select * from SERVICE where id = @id 
	end try
	begin catch
		if @@TRANCOUNT > 0
      rollback tran;
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
		rollback tran;
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
		rollback tran;
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
		rollback tran;
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
		rollback tran;
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
		rollback tran;
		throw
	end catch
commit tran

go

create or alter proc createInvoice(
	@patientId uniqueidentifier,
	@shift nvarchar(16),
	@date date
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if @patientId is null or @shift is null or @date is null
		begin 
			rollback tran;
			throw 51000, 'Input cannot be null.', 1
		end

		if not exists (
			select 1 from APPOINTMENT where patientId = @patientId and shift = @shift and date = @date
		)
		begin 
			rollback tran;
			throw 51000, 'This appointment does not exist in the database.', 1
		end 

	if exists ( 
		select 1  
		from APPOINTMENT a
		join TREATMENT t on t.dentistId = a.dentistId and t.shift = a.shift and t.date = a.date  
		join INVOICE i on i.treatmentId = t.id 
		where a.patientId = @patientId and a.shift = @shift and a.date = @date  
	) 
	begin
		rollback tran;
		throw 51000, 'This appointment has already been invoiced.', 1
	end

	declare @treatmentId uniqueidentifier = (
		select t.id 
		from APPOINTMENT a
		join TREATMENT t on t.dentistId = a.dentistId and t.shift = a.shift and t.date = a.date  
		where a.patientId = @patientId and a.shift = @shift and a.date = @date  
	)

	insert into INVOICE (treatmentId, issueDate) values (@treatmentId, GETDATE())

	select t.treatmentCharge, t.totalServiceCharge, p.total as totalDrugCharge, i.total as totalInvoiceCharge, i.issueDate
	from TREATMENT t 
	left join PRESCRIPTION p on p.id = t.prescriptionId 
	join INVOICE i on i.treatmentId = t.id
	where t.id = @treatmentId
	
	end try
	begin catch
		if @@TRANCOUNT > 0
      rollback tran;
		throw
	end catch
commit tran

go 

create or alter proc createTreatment(
	@serviceId uniqueidentifier
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		print 'Do something'
	end try
	begin catch
		rollback tran;
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
		print 'Do something'
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

create or alter proc addPrescriptionToTreatment(
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
		print 'Do something'
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go
