import { LightningElement, api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class FillLeadInformation extends LightningElement {
    @api leadId;
    @api qualificouProposta;

    // Record Form
    fields = [
        'FirstName',
        'LastName',
        'Email',
        'Phone',
        'Title',
        'Departamento__c',
        'Company',
        'Industry',
        'Raz_o_Social__c',
        'NumberOfEmployees',
        'CNPJ__c',
        'CNAE__c',
        'Address'
    ];

    // Radio Group
    get options() {
        return [
            { label: 'Sim', value: true },
            { label: 'Não', value: false },
        ];
    }

    handleQualificaProposta(event) {
        this.qualificouProposta = event.target.value;
    }

    // Navigate to the next Flow Screen
    nextScreen() {
        let navigateNextEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(navigateNextEvent);
    }

    // Validate inputs: Qualificou Proposta?
    @api
    validate() {
        if (this.qualificouProposta) {
            return { isValid: true };
        }
        else {

            return {
                isValid: false,
                errorMessage: 'Seleciona uma opcão para \'Gostaria de qualificar para proposta?\''
            };
        }
    }
}

