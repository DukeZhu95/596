import os
class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:Datacom#app@Surface-pro:3306/datacom_schema_1'
##change the dbname after db creation
    SQLALCHEMY_TRACK_MODIFICATIONS = False