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
The github website:https://github.com/YumingSu/YumingSu

About another model - factory I haven't written, I think it will be the same test like this, even the code may just change a little.


About the git, I forgot to save the change step by step.So I annotate all, and the git this step by step. I suppose it may show no change, so I give the git log below
commit c56b9905cdadf22cdd81a0753ec654b20f7150aa (HEAD -> master, delete-imitations-test)
Author: Yuming Su <877385836@qq.com>
Date:   Mon Nov 5 22:42:58 2018 +0000

    Delete imitation endpoint tested

commit 23224cade3113bb32082125b19e47d84ffd03c3e (upreport-imitations-test)
Author: Yuming Su <877385836@qq.com>
Date:   Mon Nov 5 22:41:20 2018 +0000

    Updated upreport imitation endpoint tested

commit a688d0d27f6b6126f0fd9bfe035878fb2395768b (add-imitations-test)
Author: Yuming Su <877385836@qq.com>
Date:   Mon Nov 5 22:36:14 2018 +0000

    Add imitation endpoint tested

commit 183b2564a4c2d60e5aee283a22118705aa308c90 (get-imitations-test)
Author: Yuming Su <877385836@qq.com>
Date:   Mon Nov 5 22:33:56 2018 +0000

    Get imitations endpoint tested

commit ad778d0447db0cfed3652398e8983aef3d15557f
Author: Yuming Su <877385836@qq.com>
Date:   Mon Nov 5 22:30:02 2018 +0000

    API test setup
