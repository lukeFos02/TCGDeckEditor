using TCGDeckEditor.Server.Logic.RequestMakers;
using TCGDeckEditor.Server.Logic.RequestSenders;
using TCGDeckEditor.Server.Models;
using TCGDeckEditor.Server.Requests;
using TCGDeckEditor.Server.Responses;

namespace TCGDeckEditor.Server.Logic.Processors;

public class SearchProcessor : ISearchProcessor
{
    private readonly ISearchRequestMaker searchRequestMaker;
    private readonly ISearchRequestSender searchRequestSender;

    public SearchProcessor(ISearchRequestMaker searchRequestMaker,
        ISearchRequestSender searchRequestSender)
    {
        this.searchRequestMaker = searchRequestMaker;
        this.searchRequestSender = searchRequestSender;
    }

    public async Task<SearchCardsResponse> Search(SearchCardsRequest request)
    {
        if (request != null)
        {
            var apiRequest = await this.searchRequestMaker.CreateSearchRequest(request);
            var response = await this.searchRequestSender.Send(apiRequest);
            return response;
        }
        else
        {
            throw new NullReferenceException();
        }
    }
}

public interface ISearchProcessor
{
    Task<SearchCardsResponse> Search(SearchCardsRequest request);
}