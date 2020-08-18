CREATE TABLE IF NOT EXISTS category(
                 id  INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,
 name  VARCHAR(45)
            );
            
CREATE TABLE IF NOT EXISTS buy(
                 id   INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
 value  FLOAT ,
 buyDate  DATE ,
 description  TEXT,
 category_id  INTEGER,
FOREIGN KEY (id)
            REFERENCES category(id)
            
            );
            
CREATE TABLE IF NOT EXISTS period(
 id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
type  VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS status(
                 id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
 name  VARCHAR(45) NOT NULL
            );
        
CREATE TABLE IF NOT EXISTS bill(
                 id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
 title  VARCHAR(45),
 dateCreate  DATE NOT NULL,
 dateEnded  DATE,
 valueSum  FLOAT,
 valueLimit  FLOAT,
 description  TEXT,
 status_id  INTEGER,
 period_id  INTEGER,
FOREIGN KEY (id)
            REFERENCES status(id)
            ,
FOREIGN KEY (id)
            REFERENCES period(id)          );
        
        
CREATE TABLE IF NOT EXISTS have(
                 id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
 name  VARCHAR(45),
 bill_id  INTEGER,
 buy_id  INTEGER,
FOREIGN KEY (id)
            REFERENCES bill(id)
            ,
FOREIGN KEY (id)
            REFERENCES buy(id)
            
            );
                
        
        
        
        
        
        
