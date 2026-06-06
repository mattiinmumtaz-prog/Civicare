package com.civicare.service;

import java.util.List;

public interface ServiceInterface<T, ID, REQ, RES> {
    RES create(REQ request);
    RES getById(ID id);
    List<RES> getAll();
    RES update(ID id, REQ request);
    void delete(ID id);
}