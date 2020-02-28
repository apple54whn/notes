# Oracle 运维

## 通过 Docker 安装

### 构建 Docker image

此处仅记录 Oracle12c 的 Docker image 构建及使用过程，其他版本如 19c 也类似（run 了半天没启动起来算逑了）。

注意我在 Windows 中没有构建成功，WSL 中未尝试。

构建：

1.  Clone Oracle 准备的镜像构建[仓库](https://github.com/oracle/docker-images)（有该公司许多产品）

2.  在 [Oracle 官网](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html)下载需要构建镜像的 **Linux** 原版，此处为 Oracle Database 12c Release 2

3.  进入 1 的 `docker-images/OracleDatabase/SingleInstance/dockerfiles/12.2.0.1`，将 2 下载的文件放入该目录，其他版本类似。

4.  退出到上一级目录，找到有`buildDockerImage.sh`命令的目录，执行

    ```bash
    ./buildDockerImage.sh -v 12.2.0.1 -e
    
    -----------------含义如下-------------------
    -v: version to build, Choose one of: 11.2.0.2 12.1.0.2 12.2.0.1 .etc
    -e: creates image based on ‘Enterprise Edition’
    -s: creates image based on ‘Standard Edition 2’
    -x: creates image based on ‘Express Edition’
    -i: ignores the MD5 checksums
    ```

    注意在安装过程中需要联网（可能需要科学上网），因为他会下载oraclelinux:7-slim 和 yum install pre-install 的包

5.  等待 10 多分钟应该就好了，此时就可以查看 image，会有oracle linux 和 oracle database



### 将镜像上传至阿里云

1.  重命名镜像

    ```bash
    sudo docker tag imageId registry.cn-hangzhou.aliyuncs.com/con/oracle12c_r2:12.2.0.1-ee
    ```

2.  上传（慢得要死）

    ```bash
    sudo docker push registry.cn-hangzhou.aliyuncs.com/con/oracle12c_r2:12.2.0.1-ee
    ```



### 创建容器并运行

1.  我选择创建`/usr/local/docker/oracle12c/`并进入，执行

    ```bash
    sudo docker run -d --name oracle12c \
      --privileged -v /usr/local/docker/oracle12c/oradata:/opt/oracle/oradata \
      -p 8080:8080 -p 1521:1521 oracle/database:12.2.0.1-ee
    ```

    数据库设置和数据将持久化到`/oradata`文件夹，端口将公开给 localhost 或 boot2docker 容器（Mac 和 Win）

2.  此时的数据库没有密码，需设置（此时容器必须运行正常，用`ps`查看）。此处设置为 oracle 

    ```bash
    docker exec b0 ./setPassword.sh oracle
    The Oracle base remains unchanged with value /opt/oracle
    
    SQL*Plus: Release 12.2.0.1.0 Production on Sat Feb 15 18:13:09 2020
    
    Copyright (c) 1982, 2016, Oracle.  All rights reserved.
    
    
    Connected to:
    Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production
    
    SQL>
    User altered.
    
    SQL>
    User altered.
    
    SQL>
    Session altered.
    
    SQL>
    User altered.
    
    SQL> Disconnected from Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production
    ```

3.  默认的 SID 为 `orclcdb`，使用 `system`（dba）或`sys`（sysdba）连接即可



### 运行时权限问题

当使用`-v`数据卷时，有可能容器里用户对映射的路径没有写权限，会导致运行时报错，启动不了

```
ORACLE PASSWORD FOR SYS, SYSTEM AND PDBADMIN: eTsinj4LADk=1

LSNRCTL for Linux: Version 12.2.0.1.0 - Production on 27-FEB-2020 18:27:12

Copyright (c) 1991, 2016, Oracle.  All rights reserved.

Starting /opt/oracle/product/12.2.0.1/dbhome_1/bin/tnslsnr: please wait...

TNSLSNR for Linux: Version 12.2.0.1.0 - Production
System parameter file is /opt/oracle/product/12.2.0.1/dbhome_1/network/admin/listener.ora
Log messages written to /opt/oracle/diag/tnslsnr/1d786d0a6d23/listener/alert/log.xml
Listening on: (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1)))
Listening on: (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=0.0.0.0)(PORT=1521)))

Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=IPC)(KEY=EXTPROC1)))
STATUS of the LISTENER
\------------------------
Alias                     LISTENER
Version                   TNSLSNR for Linux: Version 12.2.0.1.0 - Production
Start Date                27-FEB-2020 18:27:13
Uptime                    0 days 0 hr. 0 min. 1 sec
Trace Level               off
Security                  ON: Local OS Authentication
SNMP                      OFF
Listener Parameter File   /opt/oracle/product/12.2.0.1/dbhome_1/network/admin/listener.ora
Listener Log File         /opt/oracle/diag/tnslsnr/1d786d0a6d23/listener/alert/log.xml
Listening Endpoints Summary...
  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1)))
  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=0.0.0.0)(PORT=1521)))
The listener supports no services
The command completed successfully
[WARNING] [DBT-10102] The listener configuration is not selected for the database. EM DB Express URL will not be accessible.
   CAUSE: The database should be registered with a listener in order to access the EM DB Express URL.
   ACTION: Select a listener to be registered or created with the database.
Look at the log file "/opt/oracle/cfgtoollogs/dbca/ORCLCDB.log" for further details.
cat: /opt/oracle/cfgtoollogs/dbca/ORCLCDB/ORCLCDB.log: No such file or directory
[ 2020-02-27 18:27:23.443 UTC ] Cannot create directory "/opt/oracle/oradata/ORCLCDB".

SQL*Plus: Release 12.2.0.1.0 Production on Thu Feb 27 18:27:23 2020

Copyright (c) 1982, 2016, Oracle.  All rights reserved.

Connected to an idle instance.

SQL>    ALTER SYSTEM SET control_files='/opt/oracle/oradata/ORCLCDB/control01.ctl' scope=spfile
*
ERROR at line 1:
ORA-01034: ORACLE not available
Process ID: 0
Session ID: 0 Serial number: 0


SQL>    ALTER PLUGGABLE DATABASE ORCLPDB1 SAVE STATE
*
ERROR at line 1:
ORA-01034: ORACLE not available
Process ID: 0
Session ID: 0 Serial number: 0


SQL> BEGIN DBMS_XDB_CONFIG.SETGLOBALPORTENABLED (TRUE); END;

*
ERROR at line 1:
ORA-01034: ORACLE not available
Process ID: 0
Session ID: 0 Serial number: 0


SQL> Disconnected
mkdir: cannot create directory '/opt/oracle/oradata/dbconfig': Permission denied
mv: cannot stat '/opt/oracle/product/12.2.0.1/dbhome_1/dbs/spfileORCLCDB.ora': No such file or directory
mv: cannot stat '/opt/oracle/product/12.2.0.1/dbhome_1/dbs/orapwORCLCDB': No such file or directory
mv: cannot move '/opt/oracle/product/12.2.0.1/dbhome_1/network/admin/sqlnet.ora' to '/opt/oracle/oradata/dbconfig/ORCLCDB/': No such file or directory
mv: cannot move '/opt/oracle/product/12.2.0.1/dbhome_1/network/admin/listener.ora' to '/opt/oracle/oradata/dbconfig/ORCLCDB/': No such file or directory
mv: cannot move '/opt/oracle/product/12.2.0.1/dbhome_1/network/admin/tnsnames.ora' to '/opt/oracle/oradata/dbconfig/ORCLCDB/': No such file or directory
cp: cannot create regular file '/opt/oracle/oradata/dbconfig/ORCLCDB/': No such file or directory
ln: failed to create symbolic link '/opt/oracle/product/12.2.0.1/dbhome_1/network/admin/sqlnet.ora': File exists
ln: failed to create symbolic link '/opt/oracle/product/12.2.0.1/dbhome_1/network/admin/listener.ora': File exists
ln: failed to create symbolic link '/opt/oracle/product/12.2.0.1/dbhome_1/network/admin/tnsnames.ora': File exists
cp: cannot stat '/opt/oracle/oradata/dbconfig/ORCLCDB/oratab': No such file or directory
ORACLE_HOME = [/home/oracle] ? ORACLE_BASE environment variable is not being set since this
information is not available for the current user ID .
You can set ORACLE_BASE manually if it is required.
Resetting ORACLE_BASE to its previous value or ORACLE_HOME
The Oracle base remains unchanged with value /opt/oracle
/opt/oracle/checkDBStatus.sh: line 26: sqlplus: command not found
\#####################################
\########### E R R O R ###############
DATABASE SETUP WAS NOT SUCCESSFUL!
Please check output for further info!
\########### E R R O R ###############
\#####################################
The following output is now a tail of the alert.log:
tail: cannot open '/opt/oracle/diag/rdbms/*/*/trace/alert*.log' for reading: No such file or directory
tail: no files remaining
```

根据这条 [issue](https://github.com/oracle/docker-images/issues/227)，无论您将卷安装在哪个位置，请确保Docker容器内的用户在该位置具有写访问权限。请记住，在Linux中唯一重要的是 UID。因此，仅仅因为您在容器内有一个用户 oracle 并不意味着它是容器外的同一用户oracle。您必须确保 UID 匹配或提供正确的权限。

例如，如果您拥有一个`/home/data`，请确保它是由 UID 54321 的用户即 oracle 拥有的，或者请确保您向其他用户授予了写权限。也可以添加上组名 dba，GID 为 54322。

```bash
sudo chown -R 54321:54322 /usr/local/docker/oracle12c
```







### 设置 SID 环境变量

如果是docker，在**进入容器**后需确定是否当前为 oracle 用户

```bash
su oracle
```

直接登陆，可能报错。好像每次重启都要设置？

```
ERROR:
ORA-12162: TNS:net service name is incorrectly specified
```

原因是系统没有设置 SID

```bash
export ORACLE_SID=ORCLCDB
```

登陆

```
sqlplus /nolog
SQL>conn / as sysdba;
```



### 修改编码

可能存在`AL32UTF8`编码的服务器导入中文时字段长度不够问题，需转换为`ZHS16GBK`

查看编码等信息

```sql
select * from nls_database_parameters
```

| PARAMETER               | VALUE                        |
| ----------------------- | ---------------------------- |
| NLS_RDBMS_VERSION       | 12.2.0.1.0                   |
| NLS_NCHAR_CONV_EXCP     | FALSE                        |
| NLS_LENGTH_SEMANTICS    | BYTE                         |
| NLS_COMP                | BINARY                       |
| NLS_DUAL_CURRENCY       | $                            |
| NLS_TIMESTAMP_TZ_FORMAT | DD-MON-RR HH.MI.SSXFF AM TZR |
| NLS_TIME_TZ_FORMAT      | HH.MI.SSXFF AM TZR           |
| NLS_TIMESTAMP_FORMAT    | DD-MON-RR HH.MI.SSXFF AM     |
| NLS_TIME_FORMAT         | HH.MI.SSXFF AM               |
| NLS_SORT                | BINARY                       |
| NLS_DATE_LANGUAGE       | AMERICAN                     |
| NLS_DATE_FORMAT         | DD-MON-RR                    |
| NLS_CALENDAR            | GREGORIAN                    |
| NLS_NUMERIC_CHARACTERS  | .,                           |
| NLS_NCHAR_CHARACTERSET  | AL16UTF16                    |
| NLS_CHARACTERSET        | AL32UTF8                     |
| NLS_ISO_CURRENCY        | AMERICA                      |
| NLS_CURRENCY            | $                            |
| NLS_TERRITORY           | AMERICA                      |
| NLS_LANGUAGE            | AMERICAN                     |

修改编码

```sql
sqlplus /nolog

SQL> conn /as sysdba
SQL> shutdown immediate;
SQL> startup mount;
SQL> ALTER SYSTEM ENABLE RESTRICTED SESSION;
SQL> ALTER SYSTEM SET JOB_QUEUE_PROCESSES=0;
SQL> ALTER SYSTEM SET AQ_TM_PROCESSES=0;
SQL> alter database open;
SQL> ALTER DATABASE CHARACTER SET ZHS16GBK;
    ORA-12712: new character set must be a superset of old character set
    --提示我们的字符集：新字符集必须为旧字符集的超集，这时我们可以跳过超集的检查做更改：
SQL> ALTER DATABASE character set INTERNAL_USE ZHS16GBK;
    --我们看到这个过程和之前ALTER DATABASE CHARACTER SET操作的内部过程是完全相同的，也就是说INTERNAL_USE提供的帮助就是使Oracle数据库绕过了子集与超集的校验.
SQL> select * from v$nls_parameters; 
SQL> shutdown immediate;
SQL> startup
SQL> select * from v$nls_parameters;
```





## 备份恢复

### sqlplus

根据SID登录（直接登陆查看设置SID时笔记）

```bash
sqlplus sys/oracle@orclcdb as sysdba;
```

也可以根据 PDB 来登陆，需使用SID登录后查询`show pdbs`

```
SQL> show pdbs;

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 ORCLPDB1			  READ WRITE NO
```

```bash
sqlplus sys/oracle@orclpdb1 as sysdba;
```

登陆后可以切换用户

```sql
conn sys/oracle@orclcdb as sysdba;
```

查看当前 session 的 CDB 或 PDB

```sql
SQL> show con_name;

CON_NAME
--------------PDB----------------
ORCLPDB1
```

```sql
SQL> show con_name;

CON_NAME
--------------CDB----------------
CDB$ROOT
```

设置并启动PDB数据库（上述连接PDB后好像不用执行该步）

```SQL
alter session set container=ORCLPDB1; 
```



### 表空间

查看表空间

```sql
select name from v$datafile;
```

查看临时表空间

```sql
select name from v$tempfile;
```

在 CDB 容器下创建的用户属于公有用户，尽量在 PDB 下创建

```SQL
CREATE TABLESPACE HTDMS3
DATAFILE '/opt/oracle/oradata/ORCLCDB/ORCLPDB1/htdms3.dbf'
-- 容器中推荐使用上面查询到的路径，如上
---若写为 DATAFILE './HTDMS3.DBF',则会存在/u01/app/oracle/product/12.1.0.2/dbhome_1/dbs/htdms3.dbf
-- DATAFILE 'E:\oralce_data\HTDMS3.DBF' -- Windows下
SIZE 1024M
AUTOEXTEND ON
NEXT 32M 
MAXSIZE UNLIMITED;
```

删除表空间

```sql
DROP tablespace HTDMS3;
```





### 用户

* 删除原有用户（不删除表空间）

    ```sql
    drop user htdms3 cascade;
    ```

    若提示`ORA-01940: 无法删除当前连接的用户`，则需要查看用户的连接状况 

    ```sql
    select username,sid,serial# from v$session where username='htdms3';
    -----或-----
    select saddr,sid,serial#,paddr,username,status from v$session where username ='ODI_SRC';
    ```

     根据用户的`sid`和`serial`删除

    ```sql
    alter system kill session'7,85';
    ```

* 创建用户（12c在CDB容器下创建用户需要在前添加C##；PDB容器下不需要）

    ```SQL
    CREATE USER htdms3
    IDENTIFIED BY 111111
    DEFAULT TABLESPACE htdms3;
    ```

* 授权

    ```SQL
    grant all privileges to HTDMS3;
    grant dba to HTDMS3;
    ---------------------------
    grant sysdba to HTDMS3;
    ```



### 备份恢复

根据需要将SID换为PDB

* 恢复数据（指定表）

    ```SQL
    imp HTDMS3/111111@192.168.1.108/oradb file=D:/DataBase/bjtrq3/_backup/htdms3.dmp ignore=y FULL=Y
    ```

* 备份数据（指定表）

    owner是当前用户时可以不指定，否则报错

    ```sql
    exp htdms3/111111@192.168.1.108/oradb file=D:/DataBase/bjtrq3/_backup/HTDMS_1225.dmp log=D:/DataBase/bjtrq3/_backup/HTDMS_1225.log tables=(DMS_GRP_DOC_TYPE) owner=htdms3 
    ```

    ```sql
      // 不指定owner如下：
      Connected to: Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production
      Export done in ZHS16GBK character set and AL16UTF16 NCHAR character set
    
      About to export specified users ...
      . exporting pre-schema procedural objects and actions
      . exporting foreign function library names for user DMSZYGD 
      . exporting PUBLIC type synonyms
      . exporting private type synonyms
      . exporting object type definitions for user DMSZYGD 
      About to export DMSZYGD's objects ...
      . exporting database links
      . exporting sequence numbers
      . exporting cluster definitions
      . about to export DMSZYGD's tables via Conventional Path ...
      . . exporting table                    APP_DMS_DOC         86 rows exported
      . . . . . .
      . exporting synonyms
      . exporting views
      . exporting stored procedures
      . exporting operators
      . exporting referential integrity constraints
      . exporting triggers
      . exporting indextypes
      . exporting bitmap, functional and extensible indexes
      . exporting posttables actions
      . exporting materialized views
      . exporting snapshot logs
      . exporting job queues
      . exporting refresh groups and children
      . exporting dimensions
      . exporting post-schema procedural objects and actions
      . exporting statistics
      Export terminated successfully without warnings.
    ```

    






## 数据泵

在Oracle10g中exp imp 被重新设计为Oracle Data Pump（保留了原有的 exp imp工具），数据泵与传统导出导入的区别：

* exp 和 imp 是客户端工具，他们既可以在客户端使用，也可以在服务端使用。　　
* expdp 和impdp 是服务端工具，只能在 Oracle 服务端使用。（不一定，参考下面代码）
* imp 只适用于 exp 导出文件，impdp 只适用于 expdp 导出文件。

如下笔记参考了 https://www.cnblogs.com/chinas/p/8300955.html 

### expdp

1. 为输出路径建立一个数据库的directory对象（`dp_data`需自行填写）

    ```sql
    -- 需在服务器创建该目录
    create or replace directory dp_data as 'D:\app\Administrator\dp_data\';
    ```

    查看是否创建成功

    ```sql
    select * from dba_directories;
    ```

     给将要进行数据导出的用户授权访问 

    ```sql
    grant read,write on directory dp_data to htdms;
    ```

2. 导出

    ```bash
    expdp htdms/bjtrqTXGL2018sc@10.168.52.133/orcl schemas=htdms directory=dp_data dumpfile=htdms3_dp_1128.dmp logfile=htdms3_dp_1128.log
    ```

    * ` full=y `： 全量导出数据库 
    * `tablespace`： 按表空间导出 
    * ` schemas `： 按用户导出 
    * `tables=t1,t2`： 按表导出
    * `tables=table1='where number=1234'`： 按查询条件导   

### impdp

1. 确保数据库directory目录已提前建好（参考expdp）， 提前将源库导出的数据文件传递到目标库的备份目录下 ， 给将要进行数据导入的用户授权访问 

    ```sql
    grant read,write on directory dp_data to htdms3;
    ```

2. 导入

    ```bash
    impdp htdms3/bjtrqTXGL2018sc@10.168.52.133/orcl schemas=htdms REMAP_SCHEMA=htdms:htdms3 REMAP_TABLESPACE=htdms:htdms3 directory=dp_data dumpfile=htdms3_dp_1128.dmp logfile=htdms3_dp_1128.log;
    ```

    * ` full=y `： 全量导入数据库

    * `tablespace`： 按表空间导入，可指定`REMAP_TABLESPACE`

        将表空间TBS01、TBS02、TBS03导入到表空间A_TBS，将用户B的数据导入到A，并生成新的oid防止冲突； 

        ```bash
        impdp A/passwd directory=data_dir dumpfile=expdp.dmp logfile=impdp.log  remap_tablespace=TBS01:A_TBS,TBS02:A_TBS,TBS03:A_TBS remap_schema=B:A FULL=Y transform=oid:n 
        ```

    *  ` schemas `： 按用户导入

        * 若导入的用户名同名，可以不用指定`REMAP_SCHEMA`

        * 否则需要指定映射关系`REMAP_SCHEMA=htdms:htdms3`

    * `tables=t1,t2`： 按表导入

        从A用户中把表table1和table2导入到B用户中

        ```bash
        impdp B/passwd tables=A.table1,A.table2 remap_schema=A:B directory=dp_data dumpfile=expdp.dmp logfile=impdp.log;
        ```

    *  追加数据

        ```bash
        impdp sys/passwd directory=data_dir dumpfile=expdp.dmp schemas=system logfile=impdp.log table_exists_action=replace
        ```

        `table_exists_action`导入对象已存在时执行的操作。可传指：END,REPLACE和TRUNCATE







```sql
impdp htdms3/111111@127.0.0.1/xe SCHEMAS=htdms3 DIRECTORY=bak DUMPFILE=full.dmp LOGFILE=full.log remap_tablespace='htdms':'htdms3'
```









## 恢复某一时间数据

* 查询执行的SQL语句。可以看到SQL_TEXT、LAST_LOAD_TIME

    ```SQL
    select sql_text,last_load_time from v$sql where sql_text like '%update%' order by last_load_time desc;
    ```

* 将数据回滚到需要的时间点

    ```SQL
    alter table $tablename$ enable row movement;
    flashback table $tablename$ to timestamp to_timestamp('xxxx-xx-xx xx:xx:xx', 'yyyy-mm-dd hh24:mi:ss');
    ```






## 修改列类型（已有数据）

```sql
alter table DMS_DOC_REVISION_RECORD add ARC_IDS_TEMP number;
update DMS_DOC_REVISION_RECORD set ARC_IDS_TEMP=ARC_ID,ARC_ID=null;
alter table DMS_DOC_REVISION_RECORD modify ARC_ID VARCHAR2(512);
update DMS_DOC_REVISION_RECORD set ARC_ID=to_char(ARC_IDS_TEMP),ARC_IDS_TEMP=null;
alter table DMS_DOC_REVISION_RECORD drop column ARC_IDS_TEMP;
```



