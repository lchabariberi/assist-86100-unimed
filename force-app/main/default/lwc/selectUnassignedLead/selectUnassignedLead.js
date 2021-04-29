import { LightningElement, wire, track, api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
import getUnassignedLeads from '@salesforce/apex/selectUnassignedLeadController.getUnassignedLeads';

export default class SelectUnassignedLead extends LightningElement {
    @api leadId;

    @track unassignedLeads;

    error;

    // Get Unassigned Leads
    @wire(getUnassignedLeads)
    wiredGetUnassignedLeads({ error, data }) {
        if (data) {
            this.unassignedLeads = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.unassignedLeads = undefined;
        }
    }

    // Navigate to the next Flow Screen
    nextScreen(event) {

        this.leadId = event.target.value; // Save Lead Id

        let navigateNextEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(navigateNextEvent);
    }
}