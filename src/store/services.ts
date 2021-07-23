
export const Api = {
    post: (data: ServiceRequest) => {
        return new Promise((resolve, reject) => {
            fetch(data.url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.payload)
                })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status && res.status !== 200) {
                    } else {

                    }
                }).catch((err) => {
                });
        })

    },
    get: (data: ServiceRequest) => {
        return new Promise((resolve, reject) => {
            fetch(data.url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status && res.status !== 200) {
                        resolve({ status: res.status, message: res.statusText, success: false })
                    } else {
                        resolve({ status: res.status, message: res.message, success: true, ...res })
                    }
                }).catch((err) => {
                    resolve({ status: 400, message: err.message, success: false })
                });
        })

    },
    delete: (data: ServiceRequest) => {
        return new Promise((resolve, reject) => {
            fetch(data.url,
                {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status && res.status !== 200) {
                        resolve({ status: res.status, message: res.statusText, success: false })
                    } else {
                        resolve({ status: res.status, message: res.message, success: true, ...res })
                    }
                }).catch((err) => {
                    resolve({ status: 400, message: err.message, success: false })
                });
        })

    },
    put: (data: ServiceRequest) => {
        return new Promise((resolve, reject) => {
            fetch(data.url,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.payload)
                })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status && res.status !== 200) {
                    } else {

                    }
                }).catch((err) => {
                });
        })

    },
}