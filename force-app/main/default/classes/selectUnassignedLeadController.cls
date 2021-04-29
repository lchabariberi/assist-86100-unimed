public class selectUnassignedLeadController {

    public static String getUnassignedPartnerLeadsQueueId() {
        List<Group> unassignedPartnerLeads = [
            SELECT Id
            FROM Group
            WHERE Name = 'UnassignedPartnerLeads'
        ];
        
        return( unassignedPartnerLeads[0].Id );
    }

    @AuraEnabled(cacheable=true)
    public static List<Lead> getUnassignedLeads() {

        String unassignedPartnerLeadsQueueId = getUnassignedPartnerLeadsQueueId();
        
        return [
            SELECT Id, Name, Company, Title, Phone, Email
            FROM Lead
            WHERE OwnerId = :unassignedPartnerLeadsQueueId
        ];
    }

}
