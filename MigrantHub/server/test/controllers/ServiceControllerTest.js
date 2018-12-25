var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServiceController = require('../../controllers/ServiceController')
var ServiceFactory = require('../factories/ServiceFactory');
var ServiceService = require('../../service/ServiceService');

describe('Service controller', function () {
    let req = {
            body: {
                serviceDetails: ServiceFactory.validServiceData()
            },
            user: {
                _id: "test@test.com"
            },
            query: {
                _id: "5bda52305ccfd051484ea790",
                editOwner: "test@test.com",
                search: true,
                searchQuery: 'test',
            },
            params: {
                id: "5bda52305ccfd051484ea790"
            }
        },
        service = {
            _id: "5bda52305ccfd051484ea790",
            email: "test@hotmail.com"
        };

    it('should call createService service with correct parameters from createService controller', test(async function () {
        this.stub(ServiceService, 'createService');
        ServiceController.createService(req.user, req.body.serviceDetails);
        assert.calledWith(await ServiceService.createService, req.user, req.body.serviceDetails);
    }));

    it('should call getServices service with correct parameters from createService controller', test(async function () {
        this.stub(ServiceService, 'getServices');
        ServiceController.getServices(req.query.editOwner, req.query.searchQuery, req.query.search);
        assert.calledWith(await ServiceService.getServices, req.query.editOwner, req.query.searchQuery, req.query.search);
    }));

    it('should call getService service with correct parameters from getService controller', test(async function () {
        this.stub(ServiceService, 'getService');
        ServiceController.getService(service._id);
        assert.calledWith(await ServiceService.getService, service._id);
    }));

    it('should call updateService service with correct parameters from updateService controller', test(async function () {
        this.stub(ServiceService, 'updateService');
        ServiceController.updateService(req.body.serviceDetails);
        assert.calledWith(await ServiceService.updateService, req.body.serviceDetails);
    }));

    it('should call deleteService service with merchant service owner from deleteService controller', test(async function () {
        this.stub(ServiceService, 'deleteService');
        ServiceController.deleteService(service._id);
        assert.calledWith(await ServiceService.deleteService, service._id);
    }));
});