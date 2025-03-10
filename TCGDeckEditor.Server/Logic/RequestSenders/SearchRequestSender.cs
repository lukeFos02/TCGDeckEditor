using System.Text.Json;
using Newtonsoft.Json;
using RestSharp;
using TCGDeckEditor.Server.Models;
using TCGDeckEditor.Server.Responses;

namespace TCGDeckEditor.Server.Logic.RequestSenders;

public class SearchRequestSender : ISearchRequestSender
{
    private const string API_KEY = "4fd5bdf811a448d1b26438fdf4fb1595e861ea0018af0128def017da271fd67c";
    
    public async Task<SearchCardsResponse> Send(string request)
    {
        using (var client = new RestClient(request))
        {
            var apiRequest = new RestRequest();
            apiRequest.AddHeader("x-api-key", API_KEY);

            var apiReturn= await client.GetAsync(apiRequest);
            var result = JsonConvert.DeserializeObject<SearchCardsResponse>(apiReturn.Content);
            
            return result;
        }
    }
}

public interface ISearchRequestSender
{
    Task<SearchCardsResponse> Send(string request);
}