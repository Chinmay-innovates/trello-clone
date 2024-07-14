import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl="/organisation/:id"
            afterCreateOrganizationUrl="/organisation/:id"
        />
    )
}