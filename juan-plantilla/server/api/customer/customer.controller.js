/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/customers              ->  index
 * POST    /api/customers              ->  create
 * GET     /api/customers/:id          ->  show
 * PUT     /api/customers/:id          ->  upsert
 * PATCH   /api/customers/:id          ->  patch
 * DELETE  /api/customers/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Customer from './customer.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Customers //
// Crear un endpoint que regrese el listado de usuarios.
export function index(req, res) {
  return Customer.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Customer from the DB
//Crear un endpoint que se le envié un id y 
//regrese el usuario encontrado en la lista anterior.
export function show(req, res) {
  return Customer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Crear un endpoint que agregué un usuario a la lista anterior.
export function create(req, res) {
  return Customer.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
