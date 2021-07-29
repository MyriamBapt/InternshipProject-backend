insert into users
(first_name, last_name, email, height, weight, other_info, avatar_url)
VALUES
('Tom', 'Cruise', 'tom@gmail', 1.80, 70.2, 'Very good actor', 'http://' ),
('Bob', 'Marley', 'bob@gmail', 1.75, 84.7, 'The best singer', 'http://' ),
('John', 'Wayne', 'john@gmail', 1.82, 75.2, 'Lorem ypsum', 'http://' ),
('Christin', 'Tolkin', 'tolkin@gmail', 1.68, 55.5, 'Post graduate student', 'http://' ),
('Mary', 'Popins', 'mary@gmail', 1.70, 69.7, 'Old man dot', 'http://' );

select * from users;

insert into professionals
(first_name, last_name, email, phone, city, occupation, years_activity, specs, first_meeting_price, followup_meeting_price, avatar_url)
VALUES
('George', 'Clouny', 'george@gmail.com', '0645698759', 'Nantes', 'dieteticien', 20, ARRAY ['a','b','c','d'], 55, 45, 'http://'),
('Myriam', 'Baptiste', 'myriam@gmail.com', '0687965231', 'Lyon', 'dieteticien', 10, ARRAY ['a','b','c','d'], 53, 43, 'http://'),
('Holy', 'Jekings', 'holy@gmail.com', '0632589745', 'Monaco', 'dieteticien', 20, ARRAY ['a','b','c','d'], 50, 40, 'http://'),
('Nina', 'Simone', 'nina@gmail.com', '0678963254', 'Nantes', 'dieteticien', 20, ARRAY ['a','b','c','d'], 60, 50, 'http://');

select * from professionals;

insert into rendez_vous
(more_info, date_hour, "userId", "professionalId")
VALUES
('I need to lose weight', now(), 1, 3),
('I need to lose weight', now(), 2, 3),
('I need to lose weight', now(), 3, 3),
('I need to lose weight', now(), 4, 2),
('I need to lose weight', now(), 5, 4),
('I need to lose weight', now(), 1, 5);

select * from rendez_vous;

select
    concat_ws(' ', u.first_name, u.last_name) as "user full name",
    concat_ws(' ', p.first_name, p.last_name) as "prof full name",
    r.date_hour as "date time rendez-vous"
from users u
         join rendez_vous r on u.id = r."userId"
         join professionals p on r."professionalId" = p.id
where u.id = 2;

select concat_ws(' ', u.first_name, u.last_name) as "user full name",
       concat_ws(' ', p.first_name, p.last_name) as "prof full name",
       r.date_hour as "date time rendez-vous"
from users u
         join rendez_vous r on u.id = r."userId"
         join professionals p on r."professionalId" = p.id
where p.id = 3;

insert into reviews
(review, stars, date_hour, "userId", "professionalId")
VALUES
('lorem ypsum lorem ypsum lorem ypsum lorem ypsum', 5, now(), 1, 3),
('lorem ypsum lorem ypsum lorem ypsum lorem ypsum', 5, now(), 2, 3),
('lorem ypsum lorem ypsum lorem ypsum lorem ypsum', 5, now(), 2, 3),
('lorem ypsum lorem ypsum lorem ypsum lorem ypsum', 5, now(), 3, 4),
('lorem ypsum lorem ypsum lorem ypsum lorem ypsum', 5, now(), 4, 5);

select
    concat_ws(' ', u.first_name, u.last_name) as "user full name",
    concat_ws(' ', p.first_name, p.last_name) as "prof full name",
    r.review, r.date_hour
from users u
         join reviews r on u.id = r."userId"
         join professionals p on p.id = r."professionalId"
where p.id = 3;

select * from professionals;

select concat_ws(' ', p.first_name, p.last_name) AS "Prof full name",
       r.review, r.stars, p.id, r."professionalId"
from professionals p
         join reviews r on p.id = r."professionalId"
where p.first_name = 'Myriam';

select p.first_name, p.last_name, p.id,
       r."professionalId", r.review
from professionals p
         join reviews r on p.id = r."professionalId" ;


select * from reviews;

update reviews set review = 'Its very nice to find my form again'
where id = 5;

select r.id, r.date_hour, r.more_info,
       concat_ws(' ', u.first_name, u.last_name) as "user full name",
       concat_ws(' ', p.first_name, p.last_name) as "prof full name"
from rendez_vous r
         join professionals p on r."professionalId" = p.id
         join users u on r."userId" = u.id
where p.id = 3;

select * from rendez_vous;
select * from professionals;

update professionals set specs = '{"kind", "friendly", "good looking", "openminded"}' where id = 9;


delete from professionals where id = 10 or id = 14 or id = 15;


-------------------------------------------------------------------------------







