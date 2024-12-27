import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable()
export class LeadService {
    constructor(private dataService: DataService) { }

    saveLeadDetails(data) {
        return this.dataService.post('/api/ProspectsSave', data);
    }
    saveContactDetails(data) {
        return this.dataService.post('/api/ContactSave', data);
    }
    getLeadList(data) {
        return this.dataService.getRecord('/api/GetProspectsAll?pageNumber=' + data);
    }
    getLeadBySearch(data) {
        return this.dataService.getRecord('/api/SearchProspects/' + data);
    }
    getContactsBySearch(data) {
        return this.dataService.getRecord('/api/SearchContact/' + data);
    }
    filterSearch(searchOption) {
        return this.dataService.getRecord('/api/ProspectsFilters?' + searchOption);
    }
    getLeadDetails(company) {
        return this.dataService.getRecord('/api/GetProspects/' + company);
    }
    getContactList(data) {
        return this.dataService.getRecord('/api/GetProspectsContacts?pageNumber=' + data);
    }

    getLeadbyId(companyId) {
        return this.dataService.getRecord(`/api/GetProspectsAllV1/${companyId}`);
    }

    getContactbyId(companyId,contactId) {
        return this.dataService.getRecord(`/api/GetProspectsContactV1/${companyId}/${contactId}`);
    }
}