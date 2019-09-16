CommentDo
===========

Description
------------  
      The generic comment system which is easily pluggable into any ReactJs based application.
      Provides basic Add, Edit, and Delete operations and also
      allows user to reply in nested format(Reply for a Reply).
      
Dependecies:
---------------
1.Mongo db in local(Connected with default port)
2.Node Js

Built using
---------------
  * React Js,
  * Express Js,
  * Mongo database
 
 **NOTE**:
 ---------
 *INSTALL MONGO DB IN YOUR LOCAL and create a collection "CommentDB".*
 
  To Set up this application local:
  -------------------------------------
    1.clone the repository
    2.Open command prombt and go to package.json directory
    3.execute "npm install"
    4.execute "npm run build"
    5.open another command prombt and go to the same directory
    6.execute "npm run start:server" 
    7.Open this URL http://localhost:8090 in your browser
    
  To test:
  --------
    1. Launch application URL with any name(i.e http://localhost:8090/subithal). Considering "subithal" has logged on to the portal.
    2. Now "subithal" can only Edit her comment and will be able to delete the thread which she started.
    3. If launch the application with (http://localhost:8090/sumathi) URL. we are going to consider that sumathi has logged in to the portal
       and can't edit or delete others comments but she can reply to anyone's comment.
    4.To comment anonymously just launch base application URL.
    5.Deleting Particular comment would actually delete the descending replies.
    
        
    
 
  

      
