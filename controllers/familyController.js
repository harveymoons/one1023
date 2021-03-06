"use strict";

const FamilyService = require("../service/familyService");

module.exports = {
    create: async (req, res, next) => {
        const param = req.body;
        const familyRecord = await FamilyService.create(param);
        res.send(familyRecord);
    },
    findById: async (req, res, next) => {
        const param = req.params;
        const familyRecord = await FamilyService.findOne(param);
        res.send(familyRecord);
    },
    findByMembers: async (req, res, next) => {
        const param = req.params;
        const familyRecord = await FamilyService.findOne(param);
        res.send(familyRecord);
    },
    update: async (req, res, next) => {
        const param = req.body;
        const familyRecord = await FamilyService.findByIdAndUpdate(param);
        res.send(familyRecord);
    },
    delete: async (req, res, next) => {
        const param = req.body;
        const familyRecord = await FamilyService.findByIdAndDelete(param);
        res.send(familyRecord);
    },
};
