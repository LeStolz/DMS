drop database DMS

if exists (select loginname from master.dbo.syslogins where name = 'guest')
	drop login guest

if exists (select loginname from master.dbo.syslogins where name = 'patient')
	drop login patient

if exists (select loginname from master.dbo.syslogins where name = 'dentist')
	drop login dentist

if exists (select loginname from master.dbo.syslogins where name = 'staff')
	drop login staff

if exists (select loginname from master.dbo.syslogins where name = 'admin')
	drop login admin