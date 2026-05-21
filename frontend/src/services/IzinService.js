import API_BASE_URL from "./Api"

const ENDPOINT = `${API_BASE_URL}/Izin`;

async function getErrorMessage(response, fallbackMessage) {
    try {
        const contentType = response.headers.get("Content-Type") || "";

        if (contentType.includes("application/json")) {
            const errorBody = await response.json();

            return errorBody.message || errorBody.title || fallbackMessage;
        }

        const text = await response.text();

        return text || fallbackMessage;
    }
    catch {
        return fallbackMessage;
    }
}

async function ensureSuccess(response, fallbackMessage) {
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, fallbackMessage));
    }
}

export async function getAllIzin() {
    const response = await fetch(ENDPOINT);

    await ensureSuccess(response, "Failed to fetch data");

    return response.json();
}

export async function getMinimumTanggalIzinRule() {
    const response = await fetch(`${ENDPOINT}/minimum-tanggal`);

    await ensureSuccess(response, "Failed to fetch minimum tanggal izin");

    return response.json();
}

export async function createIzin(data) {

    const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    await ensureSuccess(response, "Failed to create data");

    return response.json();
}

export async function updateIzin(id, data) {

    const response = await fetch(`${ENDPOINT}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    await ensureSuccess(response, "Failed to update data");
}

export async function deleteIzin(id) {

    const response = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE"
    });

    await ensureSuccess(response, "Failed to delete data");
}
