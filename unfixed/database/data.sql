use DMS
go
set datefirst 7
go

create or alter proc _insertData as
begin tran
	set xact_abort on
	set nocount on

	begin try
		insert into admin(name, password, phone) values
			(N'Võ Nam Đăng', 'Admin12345', '0211260560')

		exec createStaff N'Hồ Nguyễn Minh Thư', 'Staff12345', '0211260050', 'female'
		exec createStaff N'Trần Ngọc Diễm Châu', 'Staff12345', '0211260520', 'female'

		exec createDentist N'Võ Nam Đăng', 'Dentist12345', '0211260560', 'male'
		exec createDentist N'Hồ Nguyễn Minh Thư', 'Dentist12345', '0211260050', 'female'
		exec createDentist N'Trương Hoàng Kha', 'Dentist12345', '0211260200', 'male'
		exec createDentist N'Trần Ngọc Diễm Châu', 'Dentist12345', '0211260520', 'female'

		exec createPatient
			N'Đoàn Ngọc Thức', 'DoanNgocThuc12345', '0211260840', 'male', '2003-12-12', N'Q. Tân Phú, TP. Hồ Chí Minh'
		exec createPatient
			N'Nguyễn Trần Trung Hậu', 'NguyenTranTrungHau12345', '0211260630', 'male', '2003-09-06', N'TP. Tây Ninh'
		exec createPatient
			N'Trương Hoàng Kha', 'TruongHoangKha12345', '0211260200', 'male', '2003-01-01', N'TP. Hồ Chí Minh'
		exec createPatient
			N'Nguyễn Hồ Bảo Khánh', 'NguyenTranBaoKhanh12345', '0211260210', 'female', '2003-01-01', N'TP. Hồ Chí Minh'
		exec createPatient
			N'Thái Văn Vinh', 'ThaiVanVinh12345', '0211260460', 'male', '2003-06-25', N'Q. Chợ Rẫy, TP. Hồ Chí Minh'
		exec createPatient
			N'Lê Hoàng Nguyên', 'LeHoangNguyen12345', '0211260770', 'male', '2003-01-01', N'TP. Hồ Chí Minh'

		declare
			@dentist56 uniqueidentifier, @dentist05 uniqueidentifier,
			@dentist20 uniqueidentifier, @dentist52 uniqueidentifier,
			@patient63 uniqueidentifier, @patient20 uniqueidentifier,
			@patient21 uniqueidentifier, @patient84 uniqueidentifier

		select @dentist56 = id from dentist where phone = '0211260560'
		select @dentist05 = id from dentist where phone = '0211260050'
		select @dentist20 = id from dentist where phone = '0211260200'
		select @dentist52 = id from dentist where phone = '0211260520'
		select @patient20 = id from patient where phone = '0211260200'
		select @patient21 = id from patient where phone = '0211260210'
		select @patient63 = id from patient where phone = '0211260630'
		select @patient84 = id from patient where phone = '0211260840'

		exec addDentistSchedule @dentist56, 2, 'evening'
		exec addDentistSchedule @dentist56, 3, 'morning'
		exec addDentistSchedule @dentist56, 3, 'afternoon'
		exec addDentistSchedule @dentist56, 4, 'morning'
		exec addDentistSchedule @dentist56, 4, 'afternoon'
		exec addDentistSchedule @dentist56, 5, 'afternoon'
		exec addDentistSchedule @dentist56, 6, 'afternoon'
		exec addDentistSchedule @dentist56, 7, 'evening'
		exec addDentistSchedule @dentist56, 1, 'evening'
		exec addDentistSchedule @dentist52, 2, 'evening'
		exec addDentistSchedule @dentist52, 3, 'morning'
		exec addDentistSchedule @dentist52, 3, 'afternoon'
		exec addDentistSchedule @dentist52, 4, 'afternoon'
		exec addDentistSchedule @dentist52, 5, 'afternoon'
		exec addDentistSchedule @dentist52, 6, 'evening'
		exec addDentistSchedule @dentist52, 7, 'evening'
		exec addDentistSchedule @dentist52, 1, 'evening'
		exec addDentistSchedule @dentist05, 2, 'morning'
		exec addDentistSchedule @dentist05, 2, 'afternoon'
		exec addDentistSchedule @dentist05, 3, 'evening'
		exec addDentistSchedule @dentist05, 4, 'evening'
		exec addDentistSchedule @dentist05, 5, 'morning'
		exec addDentistSchedule @dentist05, 5, 'evening'
		exec addDentistSchedule @dentist05, 6, 'morning'
		exec addDentistSchedule @dentist05, 6, 'evening'
		exec addDentistSchedule @dentist20, 7, 'morning'
		exec addDentistSchedule @dentist20, 7, 'afternoon'
		exec addDentistSchedule @dentist20, 7, 'evening'
		exec addDentistSchedule @dentist20, 1, 'morning'
		exec addDentistSchedule @dentist20, 1, 'afternoon'
		exec addDentistSchedule @dentist20, 1, 'evening'
		exec addDentistSchedule @dentist20, 2, 'evening'
		exec addDentistSchedule @dentist20, 3, 'evening'
		exec addDentistSchedule @dentist20, 4, 'evening'
		exec addDentistSchedule @dentist20, 5, 'evening'
		exec addDentistSchedule @dentist20, 6, 'evening'

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

		exec createDrug 'Amoxicillin', 'Use for infections caused by susceptible bacteria, gonorrhea, and gastroenteritis. Do not use for patients with a history of allergy to any type of penicillin or any ingredient of the drug.', 8000, 'tablet (500mg)'
		exec createDrug 'Cephalexin', 'Use for infections caused by susceptible bacteria, but not for the treatment of severe infections. Do not use for patients with a history of allergy to cephalosporin antibiotics.', 10000, 'tablet (500mg)'
		exec createDrug 'Clindamycin', 'Use for severe infections due to anaerobic bacteria and treatment of diseases caused by Gram-positive bacteria. Do not use for patients who are sensitive to Clindamycin, Lincomycin or any ingredient of the drug.', 21000, 'tablet (300mg)'
		exec createDrug 'Azithromycin', 'Use for infections caused by drug-sensitive bacteria such as lower respiratory tract infections and upper respiratory infections. Do not use for patients with hypersensitivity to Azithromycin or any macrolide antibiotic.', 45000, 'tablet (500mg)'
		exec createDrug 'Paracetamol', 'Use for treatment of mild to moderate pain and reducing symptoms of rheumatic pain, flu, fever and colds. Do not use for patients with hypersensitivity to paracetamol or any ingredient of the drug.', 5000, 'tablet (500mg)'
		exec createDrug 'Aspirin', 'Use for pain relief in cases of: muscle pain, back pain, sprains, toothache, fractures, dislocations, or pain after surgery. Do not use for patients with a history of asthma, hypersensitivity to any ingredient of the drug, hemophilia, thrombocytopenia, progressive gastric or duodenal ulcer, heart failure, liver failure, or kidney failure.', 6000, 'tablet (500mg)'
		exec createDrug 'Ibuprofen', 'Use for symptomatic treatment of painful diseases. Do not use for patients with hypersensitivity to ibuprofen and similar substances, progressive gastric and duodenal ulcers, severe liver cell failure, severe kidney failure, children under 15 years old, pregnant women in the first and last 3 months pregnancy, lactating women.', 10000, 'tablet (400mg)'
		exec createDrug 'Cefixim', 'Use for infections caused by susceptible strains of bacteria, pharyngitis and tonsillitis caused by Streptococcus pyogenes. Do not use for patients with a history of allergic shock to drugs or hypersensitivity to any cephalosporin or penicillin or any ingredient of the medicine.', 31000, 'tablet (200mg)'
		exec createDrug 'Clarithromycin', 'Use for infections caused by susceptible bacteria and Helicobacter pylori eradication treatment in duodenal ulcer patients. Do not use for patients with a history of QT prolongation, ventricular arrhythmia with torsades de pointes, severe liver failure, or hypersensitivity to clarithromycin, erythromycin or any other macrolide antibiotic or any ingredient of the drug. Concomitant use of clarithromycin with certain drugs such as terfenadine, astemizole, cisapride, pimozide,... is contraindicated.', 39000, 'tablet (500mg)'
		exec createDrug 'Acyclovir', 'Use for treatment of Herpes simplex infections of the skin and mucous membranes including primary and recurrent genital herpes infections, and treatment of Varicella infection (chickenpox) and Herpes zoster infection (shingles). Do not use for patients with hypersensitivity to acyclovir and valacyclovir.', 20000, 'tablet (800mg)'
		exec createDrug 'Medoral', 'Use for inflammation prevention, infections in the throat/mouth, dental hygiene, wound healing after surgery or dental treatment, and denture control. Dot not use for patients who are allergic to any ingredient of Medoral', 96000, 'bottle (250ml)'
		exec createDrug 'Eludril', 'Use for local adjunctive treatment of oral infections and dental and oral postoperative care. Do not use for patients with allergy to chlorhexidine, chlorobutanol or other ingredients of the drug.', 80000, 'bottle (90ml)'
		exec createDrug 'Fluconazole', 'Use for coccidioides immitis fungal infection and Mucosal candidiasis including oropharyngeal candidiasis, esophageal candidiasis, urinary candidiasis, and mucocutaneous candidiasis. Do not use for patients with hypersensitivity to fluconazole, azole antifungals or any ingredient of the drug.', 13000, 'box (150mg)'
		exec createDrug 'Nystatin', 'Use for treatment of Candida albicans fungal infections of the oral mucosa and pharynx. Do not use for patients hypersensitive to one of the ingredients of the drug.', 20000, 'box (2 tablets)'

		insert into drugBatch(drugId, expirationDate, import, stock) values
			((select id from drug where name = 'Amoxicillin'), '2024-01-30', 10, 10),
			((select id from drug where name = 'Amoxicillin'), '2024-01-24', 15, 15),
			((select id from drug where name = 'Cephalexin'), '2024-02-28', 10, 10),
			((select id from drug where name = 'Clindamycin'), '2024-01-09', 20, 20),
			((select id from drug where name = 'Azithromycin'), '2024-01-29', 10, 10),
			((select id from drug where name = 'Paracetamol'), '2024-01-19', 10, 10),
			((select id from drug where name = 'Paracetamol'), '2024-01-13', 20, 20),
			((select id from drug where name = 'Aspirin'), '2024-01-31', 10, 10),
			((select id from drug where name = 'Ibuprofen'), '2024-02-12', 10, 10),
			((select id from drug where name = 'Cefixim'), '2024-01-25', 10, 10),
			((select id from drug where name = 'Cefixim'), '2024-02-25', 5, 5),
			((select id from drug where name = 'Clarithromycin'), '2024-01-15', 10, 10),
			((select id from drug where name = 'Clarithromycin'), '2024-01-30', 25, 25),
			((select id from drug where name = 'Acyclovir'), '2024-01-27', 10, 10),
			((select id from drug where name = 'Medoral'), '2024-01-30', 10, 10),
			((select id from drug where name = 'Medoral'), '2024-02-28', 5, 5),
			((select id from drug where name = 'Eludril'), '2024-02-15', 10, 10),
			((select id from drug where name = 'Nystatin'), '2024-02-16', 10, 10)

		alter table appointment add constraint [Appointment date must be after today.]
			check(cast(getdate() as date) <= date)

		alter table appointment nocheck constraint [Appointment date must be after today.]

		exec bookAppointment @dentist56, @patient20, 'afternoon', '2023-12-12'
		exec bookAppointment @dentist56, @patient20, 'afternoon', '2023-12-13'
		exec bookAppointment @dentist56, @patient84, 'afternoon', '2023-12-21'
		exec bookAppointment @dentist56, @patient63, 'evening', '2023-12-24'
		exec bookAppointment @dentist52, @patient21, 'evening', '2023-12-10'
		exec bookAppointment @dentist52, @patient20, 'afternoon', '2024-01-10'
		exec bookAppointment @dentist05, @patient84, 'morning', '2024-01-08'

		alter table appointment with nocheck check constraint [Appointment date must be after today.]

		exec createTreatment @dentist56, 'afternoon', '2023-12-12', '', 'None', 'Wisdom tooth', 'Ok', 100000
		exec createTreatment @dentist56, 'afternoon', '2023-12-21', '', 'None', 'Frontal teeth', 'Ok', 100000
		exec createTreatment @dentist56, 'evening', '2023-12-24', '', 'None', 'Frontal teeth', 'Ok', 100000
		exec createTreatment @dentist52, 'evening', '2023-12-10', '', 'None', 'Wisdom tooth', 'Ok', 100000

		declare @treat12 uniqueidentifier, @treat21 uniqueidentifier, @treat24 uniqueidentifier, @treat10 uniqueidentifier

		select @treat12 = id from treatment where date = '2023-12-12'
		select @treat21 = id from treatment where date = '2023-12-21'
		select @treat24 = id from treatment where date = '2023-12-24'
		select @treat10 = id from treatment where date = '2023-12-10'

		declare @amo uniqueidentifier, @med uniqueidentifier, @asp uniqueidentifier, @par uniqueidentifier

		select @amo = id from drug where name = 'Amoxicillin'
		select @med = id from drug where name = 'Medoral'
		select @asp = id from drug where name = 'Aspirin'
		select @par = id from drug where name = 'Paracetamol'

		exec addDrugToTreatment @treat21, @amo, '2024-01-24', '1 pill/breakfast, 2 pill/diner', 3
		exec addDrugToTreatment @treat24, @med, '2024-01-30', '1 spoon/breakfast, 2 spoon/diner', 2
		exec addDrugToTreatment @treat24, @asp, '2024-01-31', '1 pill/breakfast, 2 pill/diner', 3
		exec addDrugToTreatment @treat10, @amo, '2024-01-24', '2 pill/breakfast, 1 pill/diner', 2
		exec addDrugToTreatment @treat10, @asp, '2024-01-31', '2 pill/breakfast, 2 pill/diner', 3
		exec addDrugToTreatment @treat10, @par, '2024-01-13', '2 pill/breakfast, 2 pill/diner', 2

		declare @wtx uniqueidentifier, @db uniqueidentifier, @rct uniqueidentifier, @pt uniqueidentifier

		select @wtx = id from service where name = 'Wisdom tooth extraction'
		select @db = id from service where name = 'Dental bracing'
		select @rct = id from service where name = 'Root canal treatment'
		select @pt = id from service where name = 'Periodontitis treatment'

		exec addServiceToTreatment @treat12, @wtx
		exec addServiceToTreatment @treat21, @wtx
		exec addServiceToTreatment @treat21, @db
		exec addServiceToTreatment @treat24, @rct
		exec addServiceToTreatment @treat24, @pt
		exec addServiceToTreatment @treat10, @wtx
		exec addServiceToTreatment @treat10, @db
		exec addServiceToTreatment @treat10, @rct
		exec addServiceToTreatment @treat10, @pt

		exec saveTreatment @treat12
		exec saveTreatment @treat21
		exec saveTreatment @treat24
		exec saveTreatment @treat10
	end try
	begin catch
		throw
	end catch
commit tran

go
exec _insertData
go