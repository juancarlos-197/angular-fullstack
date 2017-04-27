'use strict';

import {Router} from 'express';
import * as usuarios from './usuarios.controller';
import {list} from './usuarios.controller';
import {add} from './usuarios.controller';
import {show} from './usuarios.controller';


var router=new Router();

router.get('/',list);
router.get('/:id', show);
router.post('/add',add);

module.exports=router;
