import { LightningElement, wire, track, api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
import getOpportunityDetails from '@salesforce/apex/opportunityDetailsController.getOpportunityDetails';

export default class OpportunityDetails extends LightningElement {
    @api opportunityId;

    @track opportunity;

    mapMarkers = [
        // Hospital 9 de Julho
        {
            location: {
                Country: 'BR',
                State: 'SP',
                City: 'São Paulo',
                PostalCode: '01409-002',
                Street: 'Rua Peixoto Gomide, 545'
            },
            value: 'Hospital',
            title: 'Hospital',
            description: 'Rua Peixoto Gomide, 545 - Cerqueira César, São Paulo - SP, 01409-002',
            icon: 'custom:custom24'
        },
        // Clínica Salomão Zoppi
        {
            location: {
                Country: 'BR',
                State: 'SP',
                City: 'São Paulo',
                PostalCode: '01227-200',
                Street: 'Av. Angélica, 2251'
            },
            value: 'Clínica 1',
            title: 'Clínica 1',
            description: 'Av. Angélica, 2251 - Higienópolis, São Paulo - SP, 01227-200',
            icon: 'custom:custom58'
        },
        // Clínica Fleury
        {
            location: {
                Country: 'BR',
                State: 'SP',
                City: 'São Paulo',
                PostalCode: '01420-002',
                Street: 'Alameda Jaú, 1725'
            },
            value: 'Clínica 2',
            title: 'Clínica 2',
            description: 'Alameda Jaú, 1725 - Jardim Paulista, São Paulo - SP, 01420-002',
            icon: 'custom:custom58'
        }
    ];

    error;

    formatOpportunity(opportunity) {

        let formattedOpportunity = JSON.parse(JSON.stringify(opportunity));

        // Translate StageName
        if (formattedOpportunity.StageName == 'Qualification') {
            formattedOpportunity.StageNameTranslated = 'Prospecção';
        }
        else if (formattedOpportunity.StageName == 'Proposal/Quote') {
            formattedOpportunity.StageNameTranslated = 'Cotação';
        }
        else if (formattedOpportunity.StageName == 'Negotiation') {
            formattedOpportunity.StageNameTranslated = 'Negociação';
        }
        else if (formattedOpportunity.StageName == 'Discovery') {
            formattedOpportunity.StageNameTranslated = 'Implantação';
        }
        else if (formattedOpportunity.StageName == 'Closed Won') {
            formattedOpportunity.StageNameTranslated = 'Fechado';
        }
        else if (formattedOpportunity.StageName == 'Closed Lost') {
            formattedOpportunity.StageNameTranslated = 'Perdido';
        }

        // Brazilian date format
        let closeDate = formattedOpportunity.CloseDate.split('-');
        formattedOpportunity.CloseDateBrazilian = closeDate[2] + '/' + closeDate[1] + '/' + closeDate[0]

        return formattedOpportunity;

    }

    // Get Opportunity details
    @wire(getOpportunityDetails, { opportunityId: '$opportunityId' })
    wiredGetOpportunityDetails({ error, data }) {
        if (data) {
            this.opportunity = this.formatOpportunity(data);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.opportunity = undefined;
        }
    }

    // Navigate to the next Flow Screen
    nextScreen() {
        let navigateNextEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(navigateNextEvent);
    }
}