import { redirect } from 'next/navigation'

/**
 * /privacy is the canonical URL. It redirects to the legal page view
 * for the "privacy-policy" entry in the LegalPages collection.
 */
const PrivacyPage = () => {
  redirect('/legal/privacy-policy')
}

export default PrivacyPage
