import axios from 'axios';

// A mock runner for when JUDGE0_API_URL is not configured
export const executeCodeMock = async (language: string, code: string, input: string) => {
    // Artificial delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (code.includes('error')) {
        return {
            status: { description: 'Runtime Error' },
            stdout: null,
            stderr: 'ReferenceError: variable is not defined\n    at main (solution.js:2:5)',
            time: 0,
            memory: 0
        };
    }
    
    return {
        status: { id: 3, description: 'Accepted' },
        stdout: `Output for input: ${input}\n`,
        stderr: null,
        time: 0.045,
        memory: 12450
    };
};

export const executeCode = async (languageId: number, sourceCode: string, stdin: string) => {
    const judgeUrl = process.env.JUDGE0_API_URL;
    if (!judgeUrl) {
        return executeCodeMock(languageId.toString(), sourceCode, stdin);
    }

    try {
        const response = await axios.post(`${judgeUrl}/submissions/?base64_encoded=false&wait=true`, {
            source_code: sourceCode,
            language_id: languageId,
            stdin: stdin
        });
        
        return response.data;
    } catch (error) {
        console.error('Judge0 API Error:', error);
        throw new Error('Code execution failed');
    }
};
