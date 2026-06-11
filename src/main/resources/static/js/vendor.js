const VENDORS_API =
    "/api/vendors";

document
    .getElementById("showVendorForm")
    .addEventListener("click", () => {

        const form =
            document.getElementById(
                "vendorForm"
            );

        form.style.display =
            form.style.display === "none"
                ? "block"
                : "none";
    });

let allVendors = [];

async function loadVendors() {

    const response =
        await fetch(VENDORS_API);

    const vendors =
        await response.json();

    allVendors = vendors;

    renderVendors(vendors);
    let totalContracted = 0;
    let totalPaid = 0;
    let totalRemaining = 0;

    vendors.forEach((vendor) => {

        totalContracted +=
            Number(
                vendor.totalAmount || 0
            );

        totalPaid +=
            Number(
                vendor.paidAmount || 0
            );

        totalRemaining +=
            Number(
                vendor.remainingAmount || 0
            );
    });
    document.getElementById(
        "vendorTotalContracted"
    ).innerHTML = `
    € ${formatEuro(
        totalContracted / EUR_TO_BRL
    )}
    <br>
    <small>
        ${formatCurrency(
        totalContracted
    )}
    </small>
`;

    document.getElementById(
        "vendorTotalPaid"
    ).innerHTML = `
    € ${formatEuro(
        totalPaid / EUR_TO_BRL
    )}
    <br>
    <small>
        ${formatCurrency(
        totalPaid
    )}
    </small>
`;

    document.getElementById(
        "vendorTotalRemaining"
    ).innerHTML = `
    € ${formatEuro(
        totalRemaining / EUR_TO_BRL
    )}
    <br>
    <small>
        ${formatCurrency(
        totalRemaining
    )}
    </small>
`;
}

function getAllVendors() {
    return allVendors;
}

window.getAllVendors =
    getAllVendors;

async function saveVendor() {
    console.log("SALVANDO FORNECEDOR");
    const name =
        document.getElementById(
            "vendorName"
        ).value;

    const category =
        document.getElementById(
            "vendorCategory"
        ).value;

    const totalAmount =
        document.getElementById(
            "totalAmount"
        ).value;

    const paidAmount =
        document.getElementById(
            "paidAmount"
        ).value;

    await fetch(VENDORS_API, {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({

            name,
            category,
            totalAmount,
            paidAmount
        })
    });

    await loadVendors();
}

async function deleteVendor(id) {

    await fetch(
        `${VENDORS_API}/${id}`,
        {
            method: "DELETE"
        }
    );

    await loadVendors();
}

function renderVendors(vendors) {

    const container =
        document.getElementById("vendors");

    container.innerHTML = "";

    vendors.forEach((vendor) => {
        const paid =
            Number(vendor.paidAmount || 0);

        const remaining =
            Number(vendor.remainingAmount || 0);

        let status = "🟡 Parcial";

        if (paid <= 0) {
            status = "🔴 Pendente";
        }

        if (remaining <= 0) {
            status = "🟢 Pago";
        }

        container.innerHTML += `
            <div class="card">

                <h3>
                    ${vendor.name}
                </h3>

                <p>
                    Categoria:
                    ${vendor.category}
                </p>

                <p>
                    Total:
                    ${formatCurrency(
            vendor.totalAmount
        )}
                </p>

                <p>
                    Pago:
                    ${formatCurrency(
            vendor.paidAmount
        )}
                </p>

                <p>
                    Restante:
                    ${formatCurrency(
            vendor.remainingAmount
        )}
                </p>
                
                <p>
                    Status:
                    ${status}
                </p>
                
                <button 
                    onclick="editVendor(${vendor.id})">
                     Editar
                  </button>

                <button
                    onclick="deleteVendor(${vendor.id})">
                    Excluir
                </button>

            </div>
        `;
    });
}

async function editVendor(id) {

    const name =
        prompt("Nome:");

    if (!name) return;

    const category =
        prompt("Categoria:");

    const totalAmount =
        prompt("Valor Total:");

    const paidAmount =
        prompt("Valor Pago:");

    await fetch(
        `${VENDORS_API}/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                name,
                category,
                totalAmount,
                paidAmount
            })
        }
    );

    await loadVendors();
}

const vendorForm =
    document.getElementById("vendorForm");

console.log(vendorForm);

vendorForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        console.log("SUBMIT");

        await saveVendor();

    }
);


window.loadVendors =
    loadVendors;

window.saveVendor =
    saveVendor;

window.deleteVendor =
    deleteVendor;

window.renderVendors =
    renderVendors;

window.editVendor =
    editVendor;