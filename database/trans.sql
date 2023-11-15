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

--châu
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
		insert into staff(name, password, phone, gender)
			values (@name, @password, @phone, @gender)
		select * from staff where phone = @phone
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

--châu
create or alter proc createDentist (
	@name nvarchar(64),
	@password nvarchar(64),
	@phone nchar(10),
	@gender nvarchar(8)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		insert into dentist (name, password, phone, gender)
			values (@name, @password, @phone, @gender)
		select * from dentist where phone = @phone
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

--châu untested
create or alter proc lockUser(
	@phone nchar(10),
	@type int
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		if (@type = 1)
		begin
			update Patient
			set isLocked = 1
			where phone = @phone
			select * from patient where phone = @phone
		end;
		else if (@type = 2)
		begin
			update Dentist
			set isLocked = 1
			where phone = @phone
			select * from dentist where phone = @phone
		end;
		else if (@type = 3)
		begin
			update Staff
			set isLocked = 1
			where phone = @phone
			select * from staff where phone = @phone
		end;
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
		select *
		from dentist
		where id = @id
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

--châu
create or alter proc getDentistsOnShift(
	@date date,
	@shift nvarchar(16)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		select datepart(dw, @date)
		select d.name
		from dentistSchedule ds
		join dentist d on ds.dentistId = d.id
		where ds.date = datepart(dw, @date) and ds.shift = @shift
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

--châu
create or alter proc addDentistSchedule(
	@id uniqueidentifier, 
	@date int, 
	@shift nvarchar(16)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		insert into dentistSchedule
			values (@id, @shift, @date)
		select * from dentistSchedule where dentistId = @id
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

--châu - nó gọi một cái proc hay trigger gì nữa đúng k? t k test đc
create or alter proc removeDentistSchedule(
	@id uniqueidentifier, 
	@date int, 
	@shift nvarchar(16)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		delete from dentistSchedule 
		where dentistId = @id and [date] = @date and [shift] = @shift
		select *
		from dentistSchedule
		where dentistId = @id
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

declare @id uniqueidentifier
select @id = id from dentist where name = N'Trần Ngọc Diễm Châu'
exec removeDentistSchedule @id, @date = 1, @shift = 'afternoon';

go

create or alter proc getDrugs as
begin tran
	set xact_abort on
	set nocount on

	begin try
		select *
		from drug
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

exec getDrugs
go

--Nên làm thêm một proc để tìm thông tin thuốc bằng tên?

create or alter proc getDrugDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		select *
		from drug
		where id = @id
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

exec getDrugDetails 'B0604B1D-98C2-4C9E-9893-186CFA16FB91';
go

--châu
create or alter proc getServices as
begin tran
	set xact_abort on
	set nocount on

	begin try
		select *
		from service
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

--châu
create or alter proc getServiceDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		select *
		from service
		where id = @id
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

exec getServiceDetails '91502D66-AA5A-4853-BE08-1109D6324ECF'
go

--châu
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
		insert into drug (name, directive, price, unit) values (@name, @directive, @price, @unit)
		select * from drug where name = @name
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

exec createDrug 'Acetaminophen', 'In general, acetaminophen is used for the treatment of mild to moderate pain and reduction of fever. It is available over the counter in various forms, the most common being oral forms.', 100, 'tablet (500mg)'
go

--châu
create or alter proc updateDrug(
		@name nvarchar(64),
		@directive nvarchar(512),
		@price int,
		@unit nvarchar(64)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		declare @id uniqueidentifier
		select @id = id from drug where name = @name
		update drug
		set name = @name, directive = @directive, price = @price, unit = @unit
		where id = @id
		select *
		from drug
		where id = @id
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

exec updateDrug 'Acetaminophen', 'In general, acetaminophen is used for the treatment of mild to moderate pain and reduction of fever. It is available over the counter in various forms, the most common being oral forms.', 10000, 'tablet (500mg)'
go

--t không biết nên để input của delete drug là tên hay id nên t để cái dùng tên trong comment
--create or alter proc deleteDrug(
--		@name nvarchar(64)
--) as
--begin tran
--	set xact_abort on
--	set nocount on

--	begin try
--		declare @id uniqueidentifier
--		select @id = id from drug where name = @name
--		delete from drug where id = @id
--	end try
--	begin catch
--		rollback tran;
--		throw
--	end catch
--commit tran

--go

--châu
create or alter proc deleteDrug(
	@id uniqueidentifier
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		delete from drug where id = @id
		select * from drug
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

exec deleteDrug 'B4541805-D9AA-452D-90E1-C0445D12E004';
go

--châu
create or alter proc addDrugBatch(
	@drugId uniqueidentifier,
	@exp date,
	@import int
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		insert into drugBatch (drugId, expirationDate, import) values (@drugId, @exp, @import)
		select * from drugBatch where drugId = @drugId and expirationDate = @exp
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

exec addDrugBatch '97889C8F-844B-40BC-BD32-99312AC409C2', '2023-11-11', 100
go

--t viết 3 cái remove, cái đầu là remove theo đúng nghĩa là xóa 1 dòng, cái thứ 2 (không bị comment) là remove bằng cách
--set isRemoved, cái 3 là duyệt tất cả batch có exp date trước ngày hôm nay, và đánh dấu nó là remove hết
--theo đúng thứ tự từ trên xuống dưới từ comment này - châu

--châu
--create or alter proc removeDrugBatch(
--	@drugId uniqueidentifier,
--	@exp date
--) as
--begin tran
--	set xact_abort on
--	set nocount on

--	begin try
--		delete from drugBatch
--		where drugId = @drugId and expirationDate = @exp
--		select * from drugBatch where drugId = @drugId
--	end try
--	begin catch
--		rollback tran;
--		throw
--	end catch
--commit tran

--go

--exec removeDrugBatch '97889C8F-844B-40BC-BD32-99312AC409C2', '2023-11-11'
--go

--châu
create or alter proc removeDrugBatch(
	@drugId uniqueidentifier,
	@exp date
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		update drugBatch
		set isRemoved = 1
		where drugId = @drugId and expirationDate = @exp
		select *
		from drugBatch
		where drugId = @drugId
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

exec removeDrugBatch '97889C8F-844B-40BC-BD32-99312AC409C2', '2023-11-11'
go

--châu
--create or alter proc removeDrugBatch as
--begin tran
--	set xact_abort on
--	set nocount on

--	begin try
--		update drugBatch
--		set isRemoved = 1
--		where expirationDate < CAST(GETDATE() AS DATE)
--		select *
--		from drugBatch
--	end try
--	begin catch
--		rollback tran;
--		throw
--	end catch
--commit tran

--go

--exec removeDrugBatch
--go

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

--create or alter proc createTreatment(
--	@serviceId uniqueidentifier
--) as
--begin tran
--	set xact_abort on
--	set nocount on

--	begin try
--		print 'Do something'
--	end try
--	begin catch
--		rollback tran;
--		throw
--	end catch
--commit tran

--go

--châu - CHƯA TEST
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
		declare @serviceCharge int
		insert into treatment (dentistId, shift, date, symptoms, notes, toothTreated, outcome, treatmentCharge)
		values (@dentistId, @shift, @date, @symptoms, @notes, @toothTreated, @outcome, @treatmentCharge)
		select * from treatment where dentistId = @dentistId and shift = @shift and date = @date
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

--châu - chưa test
create or alter proc addServiceToTreatment(
	@treatmentId uniqueidentifier,
	@serviceId uniqueidentifier
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
		insert into treatedService values (@treatmentId, @serviceId)
		select * from treatedService where treatmentId = @treatmentId
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go
--châu - chưa xong
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

	declare @presId uniqueidentifier

	begin try
		select @presId = prescriptionId
		from treatment
		where id = @treatmentId

		if @presId is null
		begin
			insert into prescription(total)
			values (0);

			set @presId = SCOPE_IDENTITY()

			update treatment
			set prescriptionId = @presId
			where id = @treatmentId
		end;
		insert into prescribedDrug (prescriptionId, drugId, expirationDate, dosage, quantity) values (@presId, @drugId, @expirationDate, @dosage, @quantity)
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go