CREATE TABLE teams(
	Team_ID SERIAL NOT NULL PRIMARY KEY,
	Team_Name VARCHAR(32) NOT NULL,
	Invite_Code VARCHAR(32) NOT NULL
);