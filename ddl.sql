use nmorenodb;

create table t2_appuser (
  id int not null primary key auto_increment,
  email varchar(256) not null unique
);

create table t2_post (
  id int not null primary key auto_increment,
  title varchar(256) not null,
  content varchar(2048) not null,
  author_id int not null,
  created_at datetime default current_timestamp,
  foreign key(author_id) references t2_appuser(id)
);

create table t2_comment (
  id int not null primary key auto_increment,
  content varchar(512) not null,
  created_at datetime default current_timestamp,
  author_id int not null,
  post_id int not null,
  foreign key(author_id) references t2_appuser(id),
  foreign key(post_id) references t2_post(id)
)