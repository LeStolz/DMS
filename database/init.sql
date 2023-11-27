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

			constraint [Admin name must not be empty.]
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

			constraint [Staff name must not be empty.]
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

			constraint [Patient name must not be empty.]
				check(len(name) > 0),
			constraint [Patient phone must contain only digits and have a length of 10.]
				check(isnumeric(phone) = 1 and len(phone) = 10),
			constraint [Patient gender must be null, 'male' or 'female'.]
				check(gender is null or gender in ('male', 'female')),
			constraint [Patient DOB must be before today.]
				check(dob < getdate()),
			constraint [Patient address must not be empty.]
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

			constraint [Dentist name must not be empty.]
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
				check(status in ('pending', 'confirmed', 'cancelled')),
			constraint [Appointment date must be after today.]
				check(getdate() <= date)
		)

		create table service(
			id uniqueidentifier default(newid()) primary key,
			name nvarchar(64) not null,
			description nvarchar(1024) not null,
			price int not null,

			constraint [Service name must not be empty.]
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

			constraint [Drug name must not be empty.]
				check(len(name) > 0),
			constraint [A drug with this name already exists.]
				unique(name),
			constraint [Drug price must be positive.]
				check(price > 0),
			constraint [Drug unit must not be empty.]
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
			constraint [Prescribed drug dosage must not be empty.]
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

create or alter proc getPatientByPhone as
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

		grant exec on dbo.getPatientByPhone to dentists
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

		grant exec on dbo.createGuestPatient to staffs
		grant exec on dbo.getPatientByPhone to staffs
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

create or alter proc _insertData as
begin tran
	set xact_abort on
	set nocount on

	begin try
		insert into admin(name, password, phone) values
			(N'Võ Nam Đăng', 'Admin12345', '0211260560')

		insert into staff(name, password, phone, gender) values
			(N'Hồ Nguyễn Minh Thư', 'Staff12345', '0211260050', 'female'),
			(N'Trần Ngọc Diễm Châu', 'Staff12345', '0211260520', 'female')

		insert into dentist(name, password, phone, gender) values
			(N'Võ Nam Đăng', 'Dentist12345', '0211260560', 'male'),
			(N'Hồ Nguyễn Minh Thư', 'Dentist12345', '0211260050', 'female'),
			(N'Trương Hoàng Kha', 'Dentist12345', '0211260200', 'male'),
			(N'Trần Ngọc Diễm Châu', 'Dentist12345', '0211260520', 'female')

		insert into patient(name, password, phone, gender, dob, address) values
			(N'Đoàn Ngọc Thức', 'DoanNgocThuc12345', '0211260840', 'male', '2003-12-12', N'Q. Tân Phú, TP. Hồ Chí Minh'),
			(N'Nguyễn Trần Trung Hậu', 'NguyenTranTrungHau12345', '0211260630', 'male', '2003-09-06', N'TP. Tây Ninh'),
			(N'Trương Hoàng Kha', 'TruongHoangKha12345', '0211260200', 'male', '2003-01-01', N'TP. Hồ Chí Minh'),
			(N'Nguyễn Trần Bảo Khánh', 'NguyenTranBaoKhanh12345', '0211260210', 'female', '2003-01-01', N'TP. Hồ Chí Minh')

		declare @dentistAId uniqueidentifier
		select @dentistAId = id from dentist where phone = '0211260560'
		declare @dentistBId uniqueidentifier
		select @dentistBId = id from dentist where phone = '0211260520'

		insert into dentistSchedule(dentistId, shift, date) values
			(@dentistAId, 'morning', 1),
			(@dentistAId, 'afternoon', 2),
			(@dentistAId, 'evening', 3),
			(@dentistAId, 'morning', 4),
			(@dentistAId, 'afternoon', 4),
			(@dentistBId, 'morning', 5),
			(@dentistBId, 'afternoon', 5),
			(@dentistBId, 'evening', 6),
			(@dentistBId, 'morning', 7),
			(@dentistBId, 'afternoon', 7)

		declare @patientAId uniqueidentifier
		select @patientAId = id from patient where phone = '0211260200'
		declare @patientBId uniqueidentifier
		select @patientBId = id from patient where phone = '0211260210'

		insert into appointment(dentistId, patientId, shift, date, status) values
			(@dentistAId, @patientAId, 'afternoon', '2023-12-04', 'confirmed'),
			(@dentistAId, @patientBId, 'afternoon', '2023-12-11', 'pending'),
			(@dentistBId, @patientAId, 'morning', '2023-12-14', 'pending')

		insert into service(name, price, description) values
			('Dental bracing', 40000000, 'Bracing is a method of using specialized appliances that are fixed or removable on teeth to help move and align teeth to the correct positions. Thus giving customers even, beautiful teeth, ensuring proper chewing and biting function.'),
			('Dental implant', 20000000, 'Implants are the most effective solution to restore lost teeth as they not only help restore tooth aesthetics and ensure normal chewing ability, but dental implants also have the ability to maintain sustainability with many outstanding advantages.'),
			('Dental crowning', 8000000, 'Dental crowning is a fixed restoration technique using ceramic material that restores chewing function and improves aesthetics, helping you be confident with a naturally radiant smile.'),
			('Dental veneers', 8000000, 'Dental veneer is a porcelain veneer used to cover the outside of the tooth surface to cover up defects when the tooth structure is damaged or is dull or yellow, giving customers even, beautiful, bright white teeth.'),
			('Teeth whitening', 3000000, 'Teeth whitening is a method using oxidation to cut off the color molecular chains in dentin. This helps teeth become whiter and brighter than the original tooth color without damaging the tooth surface or any element in the tooth.'),
			('Wisdom tooth extraction', 3000000, 'Wisdom teeth often grow crookedly or crowd adjacent teeth, creating discomfort and leading to a number of dental diseases. By applying modern technology in wisdom tooth extraction, we can help the tooth be removed gently and safely.'),
			('Dental fillings', 500000, 'Dental filling is a technique in which filling material is used to restore the shape and function of the tooth. This method is meaningful in both aesthetics and the treatment and prevention of oral diseases.'),
			('Root canal treatment', 2000000, 'Root canal treatment plays an important role in nurturing strong teeth. Therefore, we need timely root canal treatment to avoid consequences affecting oral health.'),
			('Periodontitis treatment', 5000000, 'Periodontal disease is a gum infection that damages soft tissue and destroys the bone around the teeth. If the infection becomes severe, it can cause the tooth to become loose or lead to tooth loss. Periodontitis treatment must be performed as soon as possible because it will greatly affect oral health.')

		insert into drug(name, price, unit, directive) values
			('Amoxicillin', 8000, 'tablet (500mg)', 'Use for infections caused by susceptible bacteria, gonorrhea, and gastroenteritis. Do not use for patients with a history of allergy to any type of penicillin or any ingredient of the drug.'),
			('Cephalexin', 10000, 'tablet (500mg)', 'Use for infections caused by susceptible bacteria, but not for the treatment of severe infections. Do not use for patients with a history of allergy to cephalosporin antibiotics.'),
			('Clindamycin', 21000, 'tablet (300mg)', 'Use for severe infections due to anaerobic bacteria and treatment of diseases caused by Gram-positive bacteria. Do not use for patients who are sensitive to Clindamycin, Lincomycin or any ingredient of the drug.'),
			('Azithromycin', 45000, 'tablet (500mg)', 'Use for infections caused by drug-sensitive bacteria such as lower respiratory tract infections and upper respiratory infections. Do not use for patients with hypersensitivity to Azithromycin or any macrolide antibiotic.'),
			('Paracetamol', 5000, 'tablet (500mg)', 'Use for treatment of mild to moderate pain and reducing symptoms of rheumatic pain, flu, fever and colds. Do not use for patients with hypersensitivity to paracetamol or any ingredient of the drug.'),
			('Aspirin', 6000, 'tablet (500mg)', 'Use for pain relief in cases of: muscle pain, back pain, sprains, toothache, fractures, dislocations, or pain after surgery. Do not use for patients with a history of asthma, hypersensitivity to any ingredient of the drug, hemophilia, thrombocytopenia, progressive gastric or duodenal ulcer, heart failure, liver failure, or kidney failure.'),
			('Ibuprofen', 10000, 'tablet (400mg)', 'Use for symptomatic treatment of painful diseases. Do not use for patients with hypersensitivity to ibuprofen and similar substances, progressive gastric and duodenal ulcers, severe liver cell failure, severe kidney failure, children under 15 years old, pregnant women in the first and last 3 months pregnancy, lactating women.'),
			('Cefixim', 31000, 'tablet (200mg)', 'Use for infections caused by susceptible strains of bacteria, pharyngitis and tonsillitis caused by Streptococcus pyogenes. Do not use for patients with a history of allergic shock to drugs or hypersensitivity to any cephalosporin or penicillin or any ingredient of the medicine.'),
			('Clarithromycin', 39000, 'tablet (500mg)', 'Use for infections caused by susceptible bacteria and Helicobacter pylori eradication treatment in duodenal ulcer patients. Do not use for patients with a history of QT prolongation, ventricular arrhythmia with torsades de pointes, severe liver failure, or hypersensitivity to clarithromycin, erythromycin or any other macrolide antibiotic or any ingredient of the drug. Concomitant use of clarithromycin with certain drugs such as terfenadine, astemizole, cisapride, pimozide,... is contraindicated.'),
			('Acyclovir', 20000, 'tablet (800mg)', 'Use for treatment of Herpes simplex infections of the skin and mucous membranes including primary and recurrent genital herpes infections, and treatment of Varicella infection (chickenpox) and Herpes zoster infection (shingles). Do not use for patients with hypersensitivity to acyclovir and valacyclovir.'),
			('Medoral', 96000, 'bottle (250ml)', 'Use for inflammation prevention, infections in the throat/mouth, dental hygiene, wound healing after surgery or dental treatment, and denture control. Dot not use for patients who are allergic to any ingredient of Medoral'),
			('Eludril', 80000, 'bottle (90ml)', 'Use for local adjunctive treatment of oral infections and dental and oral postoperative care. Do not use for patients with allergy to chlorhexidine, chlorobutanol or other ingredients of the drug.'),
			('Fluconazole', 13000, 'box (150mg)', 'Use for coccidioides immitis fungal infection and Mucosal candidiasis including oropharyngeal candidiasis, esophageal candidiasis, urinary candidiasis, and mucocutaneous candidiasis. Do not use for patients with hypersensitivity to fluconazole, azole antifungals or any ingredient of the drug.'),
			('Nystatin', 20000, 'box (2 tablets)', 'Use for treatment of Candida albicans fungal infections of the oral mucosa and pharynx. Do not use for patients hypersensitive to one of the ingredients of the drug.')

		declare @amoxicillinId uniqueidentifier
		select @amoxicillinId = id from drug where name = 'Amoxicillin'
		declare @medoralId uniqueidentifier
		select @medoralId = id from drug where name = 'Medoral'

		insert into drugBatch(drugId, expirationDate, import, stock) values
			(@amoxicillinId, '2023-12-12', 10, 10),
			(@medoralId, '2023-12-10', 5, 5)

		insert into prescription default values

		declare @prescriptionId uniqueidentifier
		select @prescriptionId = id from prescription

		insert into treatment(
			dentistId, shift, date,
			prescriptionId, symptoms, notes, toothTreated, outcome, treatmentCharge
		) values
			(
				@dentistAId, 'afternoon', '2023-12-04',
				@prescriptionId, 'None', 'None', 'Wisdom tooth', 'Success', 100000
			)
	end try
	begin catch
		throw
	end catch
commit tran

go
exec _insertData
go