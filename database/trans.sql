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
		if @@TRANCOUNT > 0
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

--create or alter proc createPatient(
--	@name nvarchar(64),
--	@password nvarchar(64),
--	@phone nchar(10),
--	@gender nvarchar(8),
--	@dob date,
--	@address nvarchar(128)
--) as
--begin tran
--	set xact_abort on
--	set nocount on

--	begin try
--		insert into patient(name, password, phone, gender, dob, address)
--			values (@name, @password, @phone, @gender, @dob, @address)

--		select * from patient where phone = @phone
--	end try
--	begin catch
--		if @@TRANCOUNT > 0
--		rollback tran;
--		throw
--	end catch
--commit tran

--go

--create or alter proc createGuestPatient(
--	@name nvarchar(64),
--	@phone nchar(10),
--	@gender nvarchar(8),
--	@dob date,
--	@address nvarchar(128)
--) as
--begin tran
--	set xact_abort on
--	set nocount on

--	begin try
--		insert into patient(name, phone, gender, dob, address)
--			values (@name, @phone, @gender, @dob, @address)

--		select * from patient where phone = @phone
--	end try
--	begin catch
--		if @@TRANCOUNT > 0
--		rollback tran;
--		throw
--	end catch
--commit tran

--go

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
		if (@name is null or @password is null or @phone is null or @gender is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		insert into staff(name, password, phone, gender)
			values (@name, @password, @phone, @gender)
		select * from staff where phone = @phone
	end try
	begin catch
		if @@TRANCOUNT > 0
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
		if (@name is null or @password is null or @phone is null or @gender is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		insert into dentist (name, password, phone, gender)
			values (@name, @password, @phone, @gender)
		select * from dentist where phone = @phone
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

--châu unfinished
create or alter proc lockUser(
	@phone nchar(10),
	@type int
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
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
=======
		if (@type is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
>>>>>>> Stashed changes
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
		if @@TRANCOUNT > 0
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
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

--châu
create or alter proc getDentistDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
		select *
=======
		if (@id is null)
			begin
			rollback tran;
			throw 51000, 'Input cannot be empty.',1;
			end;
		else if not exists (select 1 from dentist where id = @id)
			begin
			rollback tran;
			throw 51000, 'No such dentist in the record.',1;
			end;
		select name as Name, phone as Phone, gender as Gender
>>>>>>> Stashed changes
		from dentist
		where id = @id
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

exec getDentistDetails '737ECD2F-E49A-48D1-A8CF-DED2BA17FC43'
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
		if @@TRANCOUNT > 0
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
<<<<<<< Updated upstream
		select datepart(dw, @date)
		select d.name
=======
		if (@date is null or @shift is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		if not exists(select 1 from dentistSchedule ds join dentist d on ds.dentistId = d.id where ds.date = datepart(dw,@date) and ds.shift=@shift)
		begin
			rollback tran;
			throw 51000, 'No dentist available during this period. Please choose another time.', 1
		end
		select d.name as Name
>>>>>>> Stashed changes
		from dentistSchedule ds
		join dentist d on ds.dentistId = d.id
		where ds.date = datepart(dw, @date) and ds.shift = @shift
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

exec getDentistsOnShift '2023-11-20', 'afternoon'
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
<<<<<<< Updated upstream
		insert into dentistSchedule
			values (@id, @shift, @date)
		select * from dentistSchedule where dentistId = @id
=======
		if (@id is null or @date is null or @shift is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1;
		end
		else if not exists(select 1 from dentist where id = @id)
		begin
			rollback tran;
			throw 51000, 'No such dentist exists in the record.', 1;
		end
		insert into dentistSchedule
		values (@id, @shift, @date);
		select * from dentistSchedule where dentistId = @id;
>>>>>>> Stashed changes
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran;

go

<<<<<<< Updated upstream
--châu - nó gọi một cái proc hay trigger gì nữa đúng k? t k test đc
=======
exec addDentistSchedule @id = '737ECD2F-E49A-48D1-A8CF-DED2BA17FC43', @date = 1, @shift='afternoon'
go

>>>>>>> Stashed changes
create or alter proc removeDentistSchedule(
	@id uniqueidentifier, 
	@date int, 
	@shift nvarchar(16)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
=======
		if (@id is null or @date is null or @shift is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		if not exists(select 1 from dentist where id = @id)
		begin
			rollback tran;
			throw 51000, 'No such dentist exists in the record.', 1
		end
		if not exists(select 1 from dentistSchedule where dentistId = @id and [date] = @date and [shift] = @shift)
		begin
			rollback tran;
			throw 51000, 'No such schedule exists in the record.',1
		end
>>>>>>> Stashed changes
		delete from dentistSchedule 
		where dentistId = @id and [date] = @date and [shift] = @shift
		select *
		from dentistSchedule
		where dentistId = @id
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran
go

<<<<<<< Updated upstream
declare @id uniqueidentifier
select @id = id from dentist where name = N'Trần Ngọc Diễm Châu'
exec removeDentistSchedule @id, @date = 1, @shift = 'afternoon';

go

=======
exec removeDentistSchedule @id = '737ECD2F-E49A-48D1-A8CF-DED2BA17FC43', @date = 1, @shift='afternoon'
go

declare @id uniqueidentifier
select @id = id from dentist where name = N'Trần Ngọc Diễm Châu'
exec removeDentistSchedule @id, @date = 2, @shift = 'afternoon';
go

-- châu TEST
>>>>>>> Stashed changes
create or alter proc getDrugs as
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
		select name
		from drug
=======
		if not exists(select 1 from drug)
			begin
				rollback tran;
				throw 51000, 'No drug recorded in the database.',1;
			end;
		select d.id, d.name, d.price, d.unit, db.stock, db.expirationDate
		from drug d
		left join (select drugId, expirationDate, stock
					from drugBatch db
					where db.isRemoved = 0 and db.expirationDate = (select min(expirationDate) from drugBatch as db2
												where db2.drugId = db.drugId)) db 
		on db.drugId = d.id
>>>>>>> Stashed changes
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

exec getDrugs
go

<<<<<<< Updated upstream
--Nên làm thêm một proc để tìm thông tin thuốc bằng tên?

create or alter proc getDrugDetails(@id uniqueidentifier) as
=======
create or alter proc getDrugDetails(@name nvarchar(64)) as
>>>>>>> Stashed changes
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
		select *
		from drug
		where id = @id
=======
		if (@name is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		if not exists(select 1 from drug where name = @name)
		begin
			rollback tran;
			throw 51000, 'No such drug exists in the record.', 1
		end
		select d.id as ID, d.name as Name, d.price as Price, d.unit as Unit, db.stock as Stock, db.expirationDate as ExpirationDate
		from drug d
		left join (select drugId, expirationDate, stock
					from drugBatch db
					where db.isRemoved = 0 and db.expirationDate = (select min(expirationDate) from drugBatch as db2
												where db2.drugId = db.drugId)) db 
		on db.drugId = d.id
		where d.name = @name
>>>>>>> Stashed changes
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream
exec getDrugDetails 'B0604B1D-98C2-4C9E-9893-186CFA16FB91';
=======
exec getDrugDetails 'Ibuprofen';
>>>>>>> Stashed changes
go

--châu
create or alter proc getServices as
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
		select name
=======
		if not exists(select 1 from service)
		begin
			rollback tran;
			throw 51000, 'No recorded services in the record.', 1
		end
		select *
>>>>>>> Stashed changes
		from service
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran
go

<<<<<<< Updated upstream
=======
exec getServices
go

>>>>>>> Stashed changes
--châu
create or alter proc getServiceDetails(@id uniqueidentifier) as
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
=======
		if (@id is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		if not exists(select 1 from service where id = @id)
		begin
			rollback tran;
			throw 51000, 'No such service exists in the record.', 1
		end
>>>>>>> Stashed changes
		select *
		from service
		where id = @id
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream
exec getServiceDetails '91502D66-AA5A-4853-BE08-1109D6324ECF'
=======
exec getServiceDetails '83EFABD4-5C5C-4687-BD95-4E506212900D'
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
		if (@name is null or @directive is null or @price is null or @unit is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
>>>>>>> Stashed changes
		insert into drug (name, directive, price, unit) values (@name, @directive, @price, @unit)
		select * from drug where name = @name
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream
exec createDrug 'Acetaminophen', 'In general, acetaminophen is used for the treatment of mild to moderate pain and reduction of fever. It is available over the counter in various forms, the most common being oral forms.', 100, 'tablet (500mg)'
=======
exec createDrug 'Acetaminophen', 'Used for the treatment of mild to moderate pain and reduction of fever. It is available over the counter in various forms, the most common being oral forms.', 100, 'tablet (500mg)'
>>>>>>> Stashed changes
go

--châu
create or alter proc updateDrug(
<<<<<<< Updated upstream
=======
		@id uniqueidentifier,
>>>>>>> Stashed changes
		@name nvarchar(64),
		@directive nvarchar(512),
		@price int,
		@unit nvarchar(64)
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
		declare @id uniqueidentifier
		select @id = id from drug where name = @name
=======
		if (@id is null or @name is null or @directive is null or @price is null or @unit is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		if not exists(select 1 from drug where id = @id)
		begin
			rollback tran;
			throw 51000, 'No such drug exists in the record.', 1
		end
>>>>>>> Stashed changes
		update drug
		set name = @name, directive = @directive, price = @price, unit = @unit
		where id = @id
		select *
		from drug
		where id = @id
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream
exec updateDrug 'Acetaminophen', 'In general, acetaminophen is used for the treatment of mild to moderate pain and reduction of fever. It is available over the counter in various forms, the most common being oral forms.', 10000, 'tablet (500mg)'
=======
exec updateDrug 'DB1ED0FD-84A2-4B1A-B873-24AC98B37AAA', 'Acetaminophen', 'Used for the treatment of mild to moderate pain and reduction of fever. It is available over the counter in various forms, the most common being oral forms.', 10000, 'tablet (500mg)'
>>>>>>> Stashed changes
go

--t không biết nên để input của delete drug là tên hay id nên t để cái dùng tên trong comment
--create or alter proc deleteDrug(
--		@name nvarchar(64)
--) as
--begin tran
--	set xact_abort on
--	set nocount on

--	begin try
<<<<<<< Updated upstream
=======
		--if (@id is null)
		--begin
		--	rollback tran;
		--	throw 51000, 'Input cannot be empty.', 1
		--end
		--if not exists(select 1 from drug where id = @id)
		--begin
		--	rollback tran;
		--	throw 51000, 'No such drug exists in the record.', 1
		--end
>>>>>>> Stashed changes
--		declare @id uniqueidentifier
--		select @id = id from drug where name = @name
--		delete from drug where id = @id
--	end try
--	begin catch
<<<<<<< Updated upstream
=======
	--if @@TRANCOUNT > 0
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
		if (@id is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		if not exists(select 1 from drug where id = @id)
		begin
			rollback tran;
			throw 51000, 'No such drug exists in the record.', 1
		end
>>>>>>> Stashed changes
		delete from drug where id = @id
		select * from drug
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream
exec deleteDrug 'B4541805-D9AA-452D-90E1-C0445D12E004';
=======
exec deleteDrug 'DB1ED0FD-84A2-4B1A-B873-24AC98B37AAA';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
		if (@drugId is null or @exp is null or @import is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		if not exists(select 1 from drug where id = @drugId)
		begin
			rollback tran;
			throw 51000, 'No such drug exists in the record.', 1
		end
		if exists(select 1 from drugBatch where drugId = @drugId and expirationDate = @exp and isRemoved = 0)
		begin
			rollback tran;
			throw 51000, 'Drug batch with such id and expiration date has already been recorded. Please update instead.', 1;
		end
		if (@exp < getdate())
		begin
			rollback tran;
			throw 51000, 'Drug batch has already expired. Please do not import this drug batch.', 1;
		end
>>>>>>> Stashed changes
		insert into drugBatch (drugId, expirationDate, import) values (@drugId, @exp, @import)
		select * from drugBatch where drugId = @drugId and expirationDate = @exp
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream
exec addDrugBatch '97889C8F-844B-40BC-BD32-99312AC409C2', '2023-11-11', 100
go
exec addDrugBatch '97889C8F-844B-40BC-BD32-99312AC409C2', '2024-11-11', 100
=======
exec addDrugBatch 'FD77D9E9-98B9-40FF-BDC6-9061045DB88E', '2023-11-9', 100
go
exec addDrugBatch 'FD77D9E9-98B9-40FF-BDC6-9061045DB88E', '2023-11-10', 100
go
exec addDrugBatch 'FD77D9E9-98B9-40FF-BDC6-9061045DB88E', '2024-11-10', 100
go
exec addDrugBatch 'FD77D9E9-98B9-40FF-BDC6-9061045DB88E', '2024-11-30', 100
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
		--if (@drugId is null or @exp is null)
		--begin
		--	rollback tran;
		--	throw 51000, 'Input cannot be empty.', 1
		--end
		--if not exists(select 1 from drug where id = @drugId)
		--begin
		--	rollback tran;
		--	throw 51000, 'No such drug exists in the record.', 1
		--end
		--if not exists(select 1 from drugBatch where drugId = @drugId and expirationDate = @exp and isRemoved = 0)
		--begin
		--	rollback tran;
		--	throw 51000, 'No such drug batch exists in the record.', 1;
		--end
>>>>>>> Stashed changes
--		delete from drugBatch
--		where drugId = @drugId and expirationDate = @exp
--		select * from drugBatch where drugId = @drugId
--	end try
--	begin catch
<<<<<<< Updated upstream
=======
	--if @@TRANCOUNT > 0
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
		if (@drugId is null or @exp is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		if not exists(select 1 from drug where id = @drugId)
		begin
			rollback tran;
			throw 51000, 'No such drug exists in the record.', 1
		end
		if not exists(select 1 from drugBatch where drugId = @drugId and expirationDate = @exp and isRemoved = 0)
		begin
			rollback tran;
			throw 51000, 'No such drug batch exists in the record.', 1;
		end
>>>>>>> Stashed changes
		update drugBatch
		set isRemoved = 1
		where drugId = @drugId and expirationDate = @exp
		select *
		from drugBatch
		where drugId = @drugId
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

exec removeDrugBatch '97889C8F-844B-40BC-BD32-99312AC409C2', '2023-11-11'
go

-- châu
create or alter proc removeExpired as
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
=======
		if not exists(select 1 from drugBatch where expirationDate < getdate())
		begin
			rollback tran;
			throw 51000, 'No expired drug batch in the database.', 1
		end
>>>>>>> Stashed changes
		update drugBatch
		set isRemoved = 1
		where expirationDate < CAST(GETDATE() AS DATE)
		select *
		from drugBatch
	end try
	begin catch
<<<<<<< Updated upstream
=======
		if @@TRANCOUNT > 0
>>>>>>> Stashed changes
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream
exec removeDrugBatch
=======
exec removeExpired
>>>>>>> Stashed changes
go

create or alter proc createInvoice as
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
--để riêng service, sau khi gọi tạo hồ sơ bệnh án sẽ gọi riêng một tran khác để thêm dịch vụ vào
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
<<<<<<< Updated upstream
=======
		IF (@dentistId IS NULL OR @shift IS NULL OR @date IS NULL OR @symptoms IS NULL OR @notes IS NULL OR @toothTreated IS NULL OR @outcome IS NULL OR @treatmentCharge IS NULL)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.',1;
		end
		if not exists(select 1 from dentist where id = @dentistId)
		begin
			rollback tran;
			throw 51000, 'No such doctor in the database.',1;
		end
		if not exists(select 1 from appointment where dentistId = @dentistId and shift = @shift and date = @date)
		begin
			rollback tran;
			throw 51000, 'The appointment does not exist in the database.',1;
		end
>>>>>>> Stashed changes
		declare @serviceCharge int
		insert into treatment (dentistId, shift, date, symptoms, notes, toothTreated, outcome, treatmentCharge)
		values (@dentistId, @shift, @date, @symptoms, @notes, @toothTreated, @outcome, @treatmentCharge)
		select * from treatment where dentistId = @dentistId and shift = @shift and date = @date
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
--châu
create or alter proc addServiceToTreatment(
	@treatmentId uniqueidentifier,
	@serviceId uniqueidentifier
) as
begin tran
	set xact_abort on
	set nocount on

	begin try
<<<<<<< Updated upstream
		insert into treatedService values (@treatmentId, @serviceId)
		select * from treatedService where treatmentId = @treatmentId
=======
		if (@treatmentId is null or @serviceId is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.',1;
		end
		if not exists(select 1 from treatment where id = @treatmentId)
		begin
			rollback tran;
			throw 51000, 'No such treatment record in the database.',1;
		end
		if not exists(select 1 from service where id = @serviceId)
		begin
			rollback tran;
			throw 51000, 'No such service in the database.',1;
		end
		insert into treatedService values (@treatmentId, @serviceId)
		select ts.treatmentId, ts.serviceId, s.name
		from treatedService ts
		join (select name, id from service) s on s.id = ts.serviceId
		where treatmentId = @treatmentId
>>>>>>> Stashed changes
	end try
	begin catch
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream
addServiceToTreatment '1D9B0C3C-21CD-4BE9-9FA2-DD02D161D4F6','5EE35749-C7B4-48C8-892F-72FFA9813785'
=======
addServiceToTreatment '18C60A93-221F-4E67-9402-EC8E720806C8','9740541D-7B54-4BB2-A370-A3798A4A1DBE'
>>>>>>> Stashed changes
go

--châu
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

	declare @presId uniqueidentifier
	declare @tempTable table ( id uniqueidentifier )

	begin try
<<<<<<< Updated upstream
=======
		if (@treatmentId is null or @drugId is null or @expirationDate is null or @dosage is null or @quantity is null)
		begin
			rollback tran;
			throw 51000, 'Input cannot be empty.', 1
		end
		if not exists(select 1 from treatment where id = @treatmentId)
		begin
			rollback tran;
			throw 51000, 'No such treatment record exists in the database.', 1
		end
		if not exists(select 1 from drug where id = @drugId)
		begin
			rollback tran;
			throw 51000, 'No such drug exists in the database.', 1
		end
		if not exists(select 1 from drugBatch db where db.drugId = @drugId and isRemoved = 0 and expirationDate >= getdate() and stock > @quantity)
		begin
			rollback tran;
			throw 51000, 'This drug has run out of stock (not enough) or all expired.', 1
		end
>>>>>>> Stashed changes
		select @presId = prescriptionId
		from treatment
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
		end;
<<<<<<< Updated upstream
=======
		if exists(select 1 from prescribedDrug pd where pd.drugId = @drugId and pd.prescriptionId = @presId)
		begin
			rollback tran;
			throw 51000, 'This drug has already been added to this prescription.', 1
		end
>>>>>>> Stashed changes
		insert into prescribedDrug (prescriptionId, drugId, expirationDate, dosage, quantity) values (@presId, @drugId, @expirationDate, @dosage, @quantity)
	end try
	begin catch
		if @@TRANCOUNT > 0
		rollback tran;
		throw
	end catch
commit tran

go

<<<<<<< Updated upstream
addDrugToTreatment 'ADB9BCC1-E0AC-4C5F-8568-A447F606383C', '97889C8F-844B-40BC-BD32-99312AC409C2', '2024-11-11', '1 pill after dinner', 10
=======
exec getDrugs
go

addDrugToTreatment '18C60A93-221F-4E67-9402-EC8E720806C8', 'fd77d9e9-98b9-40ff-bdc6-9061045db88e', '2024-11-11', '1 pill after dinner', 1
go
>>>>>>> Stashed changes
