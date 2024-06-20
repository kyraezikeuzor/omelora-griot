import axios from 'axios'

export const createCanvaDesign = async (accessToken:any, templateId:any, designName:string) => {
    const url = 'https://api.canva.com/v1/designs';
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };
    const payload = {
        template_id: templateId,
        name: designName,
    };

    try {
        const response = await axios.post(url, payload, { headers });

        if (response.status === 201) {
            const designId = response.data.id;
            const designUrl = `https://www.canva.com/design/${designId}/edit`;

            return {
                designId: designId,
                designUrl: designUrl,
                ...response.data
            };
        } else {
            throw new Error(`Failed to create design. Status code: ${response.status}`);
        }
    } catch (error:any) {
        console.error('Error creating Canva post:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export default createCanvaDesign