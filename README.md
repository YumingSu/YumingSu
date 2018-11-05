# Assignment 1 - API testing and Source Control.

Name: Yuming Su

## Overview.

To test this app if can run the all functions correctly,e.g. get all imitations,delete an imitation.

## API endpoints.

 + GET /imitations - Get all imitations.
 + POST /imitations - Add a new imitation.
 + PUT /imitations/:id/report - Report an imitation by 1.
 + Delete /imitations/:id - Delete an imitation by id.

## Data storage.
The data is independent in my test, it shows at the top of the code of the test. Each 'it' has been tested, it wii return to this setting storage.
## Sample Test execution.

       suyumingdeAir:Webappassignment1 suyuming$ npm test

       > webappassignment1@0.0.0 test /Users/suyuming/WebstormProjects/Webappassignment1
       > mocha test/routes/Imitation-Test.js

         Imitations
             GET /imitations
         Successfully Connected to [ imitationsdb ]
         Successfully Connected to [ imitationsdb ]
         GET /imitations 200 800.550 ms - 549
               ✓ should return all the imitations in an array (822ms)
         (node:3953) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
             POST /imitations
         POST /imitations 200 478.973 ms - 138
               ✓ should return confirmation message and update datastore (485ms)
         GET /imitations 200 102.277 ms - 709
             PUT /imitations/:id/report
         PUT /imitations/5bdxxxxxx7179a176d3b377a/report 404 5.417 ms - 51
               ✓ should return a 404 and a message for invalid imitation id
               PUT /imitations/5be05619bf769d0c48480d28/report 200 520.797 ms - 47
                     ✓ should return a message and the imitation reported by 1 (523ms)
               GET /imitations 200 45.840 ms - 549
                   Delete /imitations/:id
                     when it is valid id
                       ✓ should return a message and the imitation successfully deleted
               DELETE /imitations/5be05619bf769d0c48480d28 404 6.780 ms - 41
                       when it is invalid
                         ✓ should return a message and the imitation unsuccessfully deleted
               DELETE /imitations/5bdxxxxxx7179a176d3b377a 404 0.923 ms - 41
               GET /imitations 200 36.360 ms - 549


                 6 passing (2s)
        $

[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.
About another model - factory I haven't written, I think it will be the same test like this, even the code may just change a little.
