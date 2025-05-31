export const promptData = (
  questionnaires,
  companyName,
  website,
  teamMembers,
) => {
  if (questionnaires) {
    const prompt = [
      `As an advanced language model assuming the role of a seasoned marketer, I'd like you to draw upon your training data to devise compelling marketing messaging and a comprehensive executive summary for a company called ${companyName}. How would you craft marketing messages that clearly communicate ${companyName}'s unique value proposition?
                       ${
                         teamMembers && teamMembers.length > 0
                           ? `
                       Question: List all email addresses that will be involved in approving your campaign?
                           Answer: ${teamMembers.map((item) => {
                             return { item };
                           })}
                       `
                           : ''
                       } 
                       Question: What’s your Company Name? Company Name
                       Answer: ${companyName}
                       Question: What’s your Website URL?
                       Answer: ${website}
                        ${questionnaires.map((item) => {
                          const { question, answer } = item;
                          return question && answer
                            ? `Question: ${item?.question}
                               Answer: ${item?.answer}
                                `
                            : '';
                        })}`,
      `Imagine you're a sales representative for ${companyName}. In preparation for an upcoming sales call with a prospective client, can you compile a list of 10 possible objections or pushback questions that you might receive during the conversation? For each question, provide a thorough and convincing response that highlights ${companyName}'s expertise and commitment to client success, ensuring each response is detailed enough to convert the prospect into a paying customer`,
      `Considering the subtleties of social media communication, can you devise a sequence of 4 carefully crafted LinkedIn direct messages for an outreach drip campaign? Each message should follow naturally from the previous one, building a persuasive narrative that showcases ${companyName}’s services and ultimately encourages the prospect to book a meeting. Make sure each message reflects the casual, direct style typical of LinkedIn communication.`,
      `Using the parameters provided by LinkedIn Sales Navigator, create a highly detailed buyer persona for ${companyName}’s ideal client. Be as comprehensive as possible, considering factors such as job title, company size, industry, geographical location, and other pertinent attributes that would define the ideal buyer persona.`,
      `Now, based on the same Sales Navigator filters, craft another detailed buyer persona that represents a different ideal customer profile (ICP) segment. This persona should be as detailed and nuanced as the previous one, again taking into account factors such as job title, company size, industry, geographical location, and other attributes relevant to ${companyName}'s services.`,
      `Conduct a thorough market analysis for ${companyName} carefully evaluating the competitive landscape and market trends related to their services. Subsequently, develop a comprehensive SWOT analysis for ${companyName}, considering strengths, weaknesses, opportunities, and threats. Additionally, conduct a detailed PESTLE analysis to understand the macro-environmental factors affecting ${companyName}. Both these analyses should provide a holistic understanding of ${companyName}'s position in the market.`,
      `Please generate a list of 10 long-tail keywords that precisely represent ${companyName}'s services. Along with each keyword, provide an in-depth explanation highlighting its relevance to ${companyName}'s services, its potential to improve SEO, and its ability to attract the right audience. Ensure the explanations are comprehensive, providing a clear rationale for each keyword choice.`,
      `As an AI model embodying a highly experienced copywriter, create a blog post of at least 1000 words that showcases ${companyName}'s services and achievements. The blog post should function as a persuasive sales piece, enticing potential customers who read it to engage with ${companyName}. Use your training data to incorporate best practices for blog writing, ensuring the post is engaging, informative, and compelling.`,
    ];
    return prompt;
  }
};
