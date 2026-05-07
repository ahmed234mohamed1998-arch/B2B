import { APIRequestContext, expect } from '@playwright/test';

interface LoginPayload {
    pharmacyCode: string;
    password: string;
    // Add other fields if required by your API
}

// Define the shape of your API response for better intellisense
interface LoginResponse {
    data: {
        token: string;
        [key: string]: any; // Allows for other fields in the data object
    };
    [key: string]: any;
}

interface ExpiryItem {
    ProductCode: string;
    Quantity: number;
    ExpiryDate: string | null;
    localLineNumber: number;
    PharmacyPrice: number;
    Name: string;
}

interface ExpirySubmitPayload {
    ExpiryItems: ExpiryItem[];
    IsSubmit: boolean;
    RequestGUID: string;
}


export class APIUtils {
    private apiContext: APIRequestContext;
    private loginPayload: { username: string; password: string };
    private token?: string;

    constructor(apiContext: APIRequestContext, loginPayload: { username: string; password: string }) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken(): Promise<string> {
        if (this.token) {
            return this.token;
        }
        const response = await this.apiContext.post('https://newportal-qa.ibnsina-pharma.com/api/Identity/v1.0/portal/Identity/Login', {
            data: this.loginPayload
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        return this.token = responseBody.data.token;
    }

    async submitOrder(orderPayload: any): Promise<string> {
        const token = await this.getToken();
        const response = await this.apiContext.post('https://newportal-qa.ibnsina-pharma.com/api/OnlineOrder/v1.0/portal/submit-online-order', {
            data: orderPayload,
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        return responseBody.data.orderReferenceId;
    }

    
        async submitExpiryRequest(payload: ExpirySubmitPayload): Promise<string> {
            const SubmitExpiryResponse = await this.apiContext.post(
                'https://newportal-qa.ibnsina-pharma.com/api/Expiry/v2.0/portal/expiry-request/submit',
                {
                    data: payload,
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await this.getToken()}`,
                        Origin: 'https://pharmacyapp-qa.ibnsina-pharma.com',
                        Referer: 'https://pharmacyapp-qa.ibnsina-pharma.com/'
                    }
                }
            );
    
            expect(SubmitExpiryResponse.ok()).toBeTruthy();
    
            const responseBody = await SubmitExpiryResponse.json();
            console.log('Expiry request submitted successfully');
    
            return responseBody.data.referenceNumber;
        }

}