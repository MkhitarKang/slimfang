var UserSQL = {  
    //insert:
    queryAll:'select * from HSCARD', 
    limitData:'limit ?,?',
    queryData:'select count(*) as maxdata from HSCARD',
    queryKey:"where concat(IFNULL(Cdid,''),IFNULL(Cdnm,''),IFNULL(Classes,''),IFNULL(Cost,''),IFNULL(Figure,''),IFNULL(Cdlvl,''),IFNULL(`describe`,'')) like ?",
    //update:
    //delete:
};
module.exports = UserSQL;