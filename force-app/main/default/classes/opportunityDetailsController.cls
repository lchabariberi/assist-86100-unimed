public class opportunityDetailsController {
    
    @AuraEnabled(cacheable=true)
    public static Opportunity getOpportunityDetails(String opportunityId) {

        List<Opportunity> opportunities = [
            SELECT Id, Name, Account.Name, StageName, Probability, CloseDate
            FROM Opportunity
            WHERE Id = :opportunityId
        ];

        if (opportunities.size() == 1) {
    		return opportunities[0];
    	}
    	else {
    		return null;
    	}
    }

}
