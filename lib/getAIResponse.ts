import axios from 'axios'

const getAIResponse = async (prompt:string) => {

    const config = {
        headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
        }
    };

    const message = [
        {
            role: "system", 
            content: "You are a helpful assistant."
        },
        {
            role: "system", 
            content: prompt
        }
    ]

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: message,
        temperature: 0.3
      }, config);
  
      const text = response.data.choices[0].message.content;
      return text;
    
    } catch (error:any) {
      console.log("Error making API call:", error.response || error.message);
      return null;
    }

  };

export default getAIResponse;