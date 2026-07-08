import { redirect } from 'next/navigation'

/**
 * /terms is the canonical URL. It redirects to the legal page view
 * for the "terms-of-service" entry in the LegalPages collection.
 */
const TermsPage = () => {
  redirect('/legal/terms-of-service')
}

export default TermsPage
