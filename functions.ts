
  const { company, first_name, locale = 'en', white_label: whiteLabel } = client
  let { domain: emailDomain, portalDomain, brandLabel } = companies[company]
  const wdLabel =
    (has(withdrawalTypeVendor, 'localization.t') && withdrawalTypeVendor.localization.t(locale)) ||
    ''
  const reason = has(rejectionReason, 'localization.t') && rejectionReason.localization.t(locale)
  let content
  const uploadLink = `${getWeb2FrontEndUrl(client)}/settings/profile/documents/upload/pof`

  if (whiteLabel) {
    brandLabel = whiteLabels[whiteLabel].label
    emailDomain = whiteLabels[whiteLabel].domain
    portalDomain = whiteLabels[whiteLabel].portalDomain
  }

  switch (rejectionReason.key) {
    case withdrawalPendingReasons.walletSceenshot.key: {
      content = `
        <p> ${t('withdrawalPendingWalletScreenshotText1')} </p>
        <p> ${t('withdrawalPendingWalletScreenshotText2')} </p>
        <p> ${t('withdrawalPendingWalletScreenshotText3')} </p>
        <p>
        ${t('thank_you_in_advance')}
        <br/>
        ${t('from_company_support_team', { company: brandLabel })}
        </p>
        ${contactSupport(t, company, whiteLabel)}
        ${languageSelection(client, t)}
      `
      break
    }
    case withdrawalPendingReasons.walletSceenshotNotUploaded.key: {
      content = `
        <p> ${t('withdrawalPendingWalletScreenshotNoUploadedText1')} </p>
        <p> ${t('withdrawalPendingWalletScreenshotNoUploadedText2')} </p>
        <p> ${t('withdrawalPendingWalletScreenshotNoUploadedText3')} </p>
        <p> ${t('withdrawalPendingWalletScreenshotNoUploadedText4')} </p>
        <p>
        ${t('thank_you_in_advance')}
        <br/>
        ${t('from_company_support_team', { company: brandLabel })}
        </p>
        ${contactSupport(t, company, whiteLabel)}
        ${languageSelection(client, t)}
      `
      break
    }
    default: {
      content = `
        <p> ${t('email_withdrawal_pending_text_1', { paymentVendor: wdLabel })} </p>
        <p> ${reason} </p>
        <p> ${t('email_withdrawal_pending_text_2')} </p>
        <p> ${t('email_withdrawal_pending_closing', {
          emailDomain: emailDomain,
    portalDomain: `${portalDomain}/support`,
        })} </p>
      `
      if (rejectionReason.showCTA) {
        content = `${content}
        <table role="presentation" aria-hidden="true" cellspacing="0"
          cellpadding="0" border="0" class="text-sm-center"
          style="text-align:center" align="center">
          <tr>
          <td style="border-radius: 5px; background: #007AFF; text-align: center;"
              align="center" class="button-td">
          <a href="${uploadLink}"
              style="background: #007AFF;border: 15px solid #007AFF; font-family: Helvetica, Arial, sans-serif;
              font-size: 18px; line-height: 20px; text-align: center; text-decoration: none;
              display: block; border-radius: 5px; padding: 0 15px;" class="button-a">
              <span style="color:#ffffff;" class="button-link">${t(
                messages.documentsTitle.id,
              )}</span>
          </a>
          </td>
          </tr>
        </table>`
      }

      content = `${content}
        <p>
        ${t('kind_regards')}
        <br/>
        ${t('from_company_support_team', { company: brandLabel })}
        </p>
        ${contactSupport(t, company, whiteLabel)}
        ${languageSelection(client, t)}
        `
      break
    }
  }

  return [
    { name: 'subject', content: t('email_withdrawal_pending_subject') },
    { name: 'salutation', content: t('email_salutation', { name: first_name }) },
    { name: 'content', content },
    ...getRiskWarningContent(client, t),
  ]
}
