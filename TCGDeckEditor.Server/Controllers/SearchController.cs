using Microsoft.AspNetCore.Mvc;
using TCGDeckEditor.Server.Logic.Processors;
using TCGDeckEditor.Server.Models;
using TCGDeckEditor.Server.Requests;
using TCGDeckEditor.Server.Responses;

namespace TCGDeckEditor.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly ISearchProcessor searchProcessor;
    
    public SearchController(ISearchProcessor searchProcessor)
    {
        this.searchProcessor = searchProcessor;
    }

    [HttpPost]
    [Route("search")]
    public async Task<SearchCardsResponse> SearchCards(SearchCardsRequest request)
    {
        try
        {
            var response = await this.searchProcessor.Search(request);
            return response;
        }
        catch (Exception e)
        {
            return null;
        }
    }
}