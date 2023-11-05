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
		print 'Do something'
	end try
	begin catch
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
		insert into patient(name, password, phone, gender, dob, address)
			values (@name, @password, @phone, @gender, @dob, @address)

		select * from patient where phone = @phone
	end try
	begin catch
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
		insert into patient(name, phone, gender, dob, address)
			values (@name, @phone, @gender, @dob, @address)

		select * from patient where phone = @phone
	end try
	begin catch
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
		print 'Do something'
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
		print 'Do something'
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

create or alter proc bookAppointment(
	@dentistId uniqueidentifier,
	@patientId uniqueidentifier,
	@date date
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

create or alter proc getDentistsOnShift(
	@date date,
	@shift nvarchar(16)
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

create or alter proc updatePatient as
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

create or alter proc getPatientDetails(@id uniqueidentifier) as
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
		print 'Do something'
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

create or alter proc getDrugDetails(@id uniqueidentifier) as
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

create or alter proc getServices as
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

create or alter proc getServiceDetails(@id uniqueidentifier) as
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

create or alter proc createInvoice as
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

-- Giải quyết RBTV: Mỗi đơn điều trị phải có ít nhất một dịch vụ
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

-- Giải quyết RBTV:
-- 1. Mỗi đơn thuốc được kê phải thuộc về một đơn điều trị hợp lệ
-- 2. Mỗi đơn thuốc có ít một loại thuốc
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