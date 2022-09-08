export function documentRejectedContent(client, document) {
  const { company, first_name: firstName, locale, white_label: whiteLabel } = client
  let { brandLabel } = companies[company]

  if (whiteLabel) {
    brandLabel = whiteLabels[whiteLabel].label
  }

  const { rejection_code: rejectionReasonCode } = document

  let content

  switch (rejectionReasonCode) {
    case documentRejectionReasons.failedVerification.key: {
      if (emailUtils.isFailedVerificationDocumentType(document)) {
        content = `
          <p> ${t(messages.documentRejectedFailedVerificationText1.id)}</p>
          <p> ${t(messages.documentRejectedFailedVerificationText2.id, { company: brandLabel })}</p>
          <p> ${t(messages.documentRejectedFailedVerificationText3.id)}</p>
          <p> ${t(messages.thankingInAdvance.id)}</p>
          <p> ${t(messages.backofficeTeam.id)}</p>
        `
      }
      break
    }
    case documentRejectionReasons.notAcceptableDocType.key: {
      const hasContent = emailUtils.isNotAcceptableDocType(document)
      if (!hasContent) {
        break
      } else {
        if (hasContent === 'isPoi') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableDocumentTypePOIText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableDocumentTypePOIText2.id)} </p>
            <p> ${t(messages.documentRejectedHighResHint.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'isPor') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableDocumentTypeText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableDocumentTypeText2.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableDocumentTypeText3.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableDocumentTypeText4.id, {
              company: brandLabel,
            })} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.documentRejectedNotAcceptableDocumentTypeText6.id)} </p>
            <p> ${t(messages.emailKindRegards.id)} </p>
            <p>${t(messages.backofficeTeam.id)}</p>
          `
        } else if (hasContent === 'residencePermit') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableDocTypeResidencePermitText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableDocTypeResidencePermitText2.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableDocTypeResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'isPof') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableDocTypePOFText1.id)} </p>
            <p> ${t(messages.documentRejectedExpiredPOIText2.id)} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        }
        break
      }
    }
    case documentRejectionReasons.expiredDoc.key: {
      const hasContent = emailUtils.isExpiredDocDocumentType(document)
      if (!hasContent) {
        break
      } else {
        if (hasContent === 'isPoi') {
          content = `
            <p> ${t(messages.documentRejectedExpiredPOIText1.id)} </p>
            <p> ${t(messages.documentRejectedExpiredPOIText2.id)} </p>
            <p> ${t(messages.documentRejectedHighResHint.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'isPor') {
          content = `
            <p> ${t(messages.documentRejectedExpiredPORText1.id)} </p>
            <p><ul><li>${t(messages.documentRejectedExpiredPORText2.id)}</li></ul></p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'residencePermit') {
          content = `
            <p> ${t(messages.documentRejectedExpiredResidencePermitText1.id)} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText2.id)} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'isPof') {
          content = `
            <p> ${t(messages.documentRejectedExpiredPOFText1.id)} </p>
            <p> ${t(messages.documentRejectedExpiredPOIText2.id)} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        }
      }
      break
    }
    case documentRejectionReasons.unclearDoc.key: {
      if (emailUtils.isUnclearDocDocumentType(document)) {
        content = `
          <p> ${t(messages.documentRejectedUnclearDocumentText1.id)} </p>
          <p> ${t(messages.documentRejectedHighResHint.id)} </p>
          <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
          <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
        `
      }
      break
    }
    case documentRejectionReasons.notAcceptableInfo.key: {
      const hasContent = emailUtils.isNotAcceptableInfoDocumentType(document)
      if (!hasContent) {
        break
      } else {
        if (hasContent === 'isPoi' || hasContent === 'isPor') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableInfoText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfoText2.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfoText3.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfoText4.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'residencePermit') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableResidencePermitText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableResidencePermitText2.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
        `
        } else if (hasContent === '3rdPartyIdPassport') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableInfo3rdPartyIdPassportText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfo3rdPartyIdPassportText2.id)} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === '3rdPartyAuthorizationLetter') {
          content = `
            <p> ${t(
              messages.documentRejectedNotAcceptableInfo3rdPartyAuthorizationLetterText1.id,
            )} </p>
            <p> ${t(
              messages.documentRejectedNotAcceptableInfo3rdPartyAuthorizationLetterText2.id,
            )} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'cardBankStatement') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableInfoCardBankStatementText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfoCardBankStatementText2.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfoCardBankStatementText3.id)} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'virtualCreditDebitCard') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableInfoVirtualCreditDebitCardText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfoVirtualCreditDebitCardText2.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfoVirtualCreditDebitCardText3.id)} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'privateWallet') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableInfoPrivateWalletText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfoPrivateWalletText2.id)} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'swiftCopyPaymentAdvice') {
          content = `
            <p> ${t(messages.documentRejectedNotAcceptableInfoSwiftCopyPaymentAdviceText1.id)} </p>
            <p> ${t(messages.documentRejectedNotAcceptableInfoSwiftCopyPaymentAdviceText2.id)} </p>
            <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        }
      }
      break
    }
    case documentRejectionReasons.notFullPageOfDoc.key: {
      if (emailUtils.isNotFullPageOfDocDocumentType(document)) {
        content = `
          <p> ${t(messages.documentRejectedNotFullPageText1.id)} </p>
          <p> ${t(messages.documentRejectedNotFullPageText2.id)} </p>
          <p> ${t(messages.thankingInAdvance.id)} </p>
          <p>${t(messages.backofficeTeam.id)}</p>
        `
      }
      break
    }
    case documentRejectionReasons.nameMismatch.key: {
      const hasContent = emailUtils.isNameMismatchDocumentType(document)
      if (!hasContent) {
        break
      } else {
        if (hasContent === 'isPoi') {
          content = `
            <p> ${t(messages.documentRejectednameMismatchPOIText1.id, { company: brandLabel })} </p>
            <p> ${t(messages.documentRejectednameMismatchPOIText2.id)} </p>
            <p> ${t(messages.thankYouCooperation.id)} </p>
          `
        } else if (hasContent === 'isPor') {
          content = `
            <p> ${t(messages.documentRejectednameMismatchPORText1.id, { company: brandLabel })} </p>
            <p> ${t(messages.documentRejectednameMismatchPORText2.id)} </p>
            <p><ul><li>${t(messages.documentRejectedExpiredPORText2.id)}</ul></li></p>
            <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
            <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        } else if (hasContent === 'residencePermit') {
          content = `
            <p> ${t(messages.documentRejectednameMismatchResidencePermit.id, {
              company: brandLabel,
            })} </p>
            <p> ${t(messages.documentRejectedNameMismatchResidencePermitText2.id)} </p>
            <p> ${t(messages.thankYouCooperation.id)} </p>
          `
        } else if (hasContent === 'isPof') {
          content = `
          <p> ${t(messages.documentRejectedNameMismatchPOFText1.id, { company: brandLabel })} </p>
          <p> ${t(messages.documentRejectedNameMismatchPOFText2.id)} </p>
          <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
          <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
          `
        }
      }

      break
    }
    case documentRejectionReasons.addressMismatch.key: {
      if (emailUtils.isAddressMismatchDocumentType(document)) {
        content = `
          <p> ${t(messages.documentRejectedAddressMismatchText1.id)} </p>
          <p> ${t(messages.documentRejectedAddressMismatchText2.id)} </p>
          <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
        `
      }
      break
    }
    case documentRejectionReasons.sensibleInfoVisible.key: {
      if (emailUtils.isSensibleInfoDocumentType(document)) {
        content = `
          <p>${t(messages.documentRejectedSensibleInfoVisible1.id)}</p>
          <ul><li>${t(messages.documentRejectedSensibleInfoVisible2.id)}</li></ul>
          <p>${t(messages.documentRejectedSensibleInfoVisible3.id)}</p>
          <p>${t(messages.emailDepositRejectedFooter.id)}</p>
        `
      }
      break
    }
    case documentRejectionReasons.relevantDocument.key: {
      if (emailUtils.isRelevantDocumentDocumentType(document)) {
        content = `
          <p> ${t(messages.documentRejectedRelevantDocumentText1.id)} </p>
          <p> ${t(messages.documentRejectedRelevantDocumentText2.id)} </p>
          <p> ${t(messages.documentRejectedExpiredResidencePermitText3.id)} </p>
          <p> ${t(messages.documentRejectedUploadHelp.id, { company: brandLabel })} </p>
          <p> ${t(messages.emailDepositRejectedFooter.id)} </p>
        `
      }
      break
    }
    default: {
      break
    }
  }
  if (content) {
    content = `${content}
      ${contactSupport(t, company, whiteLabel)}
      ${languageSelection(client, t)}`
  } else {
    return []
  }
  return [
    {
      name: 'subject',
      content: t(messages.documentRejectedSubject.id, {rejectionReason: documentRejectionReasons[rejectionReasonCode].localization.t(locale || 'en')})},
    { name: 'salutation', content: t(messages.emailSalutation.id, { name: firstName }) },
    { name: 'content', content },
    ...getRiskWarningContent(client, t),
  ]
}
  

export function withdrawalPendingContent(client, withdrawalTypeVendor, rejectionReason) {
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
