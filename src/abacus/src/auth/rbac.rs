use crate::auth::users::User;
use casbin::{CoreApi, DefaultModel, Error as CasbinError, FileAdapter};

pub(crate) enum CommerceActions {
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    PublishProduct,
    UnpublishProduct,
    GetAllProducts, // means ALL - published/unpublished
}

pub(crate) enum FilesActions {
    UploadFile,
    DeleteFile,
}

pub(crate) enum PosActions {
    Checkout,
    GetAllPublishedProducts,
    GetCheckoutStats,
}

pub(crate) enum UsersActions {
    GetAllUsers,
}

pub(crate) enum Actions {
    Commerce(CommerceActions),
    Files(FilesActions),
    Pos(PosActions),
    Users(UsersActions),
}

#[derive(thiserror::Error, Debug)]
pub enum RbacError {
    #[error("user is not logged in (anonymous)")]
    NotLoggedIn,
    #[error("'{sub}' doesn't have enough permission to perform action '{act}' in '{obj}' module")]
    InsufficientPermissions {
        sub: String,
        obj: String,
        act: String,
    },
    #[error("{0}")]
    Casbin(#[from] CasbinError),
}

#[derive(Debug)]
pub(crate) struct RbacSuccess;

/// Verifies whether the user is signed in AND whether it has the correct permissions according to
/// our RBAC policies.
///
/// Please note (TODO): this is quick'n'dirty solution. We should migrate these policies to the
/// database instead of storing them in a file.
pub(crate) async fn verify_permissions(
    user: &User,
    actions: &Actions,
) -> Result<RbacSuccess, RbacError> {
    match user {
        User::SignedUser(signed_user) => {
            let model = DefaultModel::from_str(include_str!("rbac_model.conf")).await?;
            let adapter = FileAdapter::new("rbac_policy.csv"); // TODO: migrate the policies to `ArandodbAdapter`

            match casbin::Enforcer::new(model, adapter).await {
                Ok(enforcer) => {
                    let sub: &str = signed_user.id_ref();
                    let obj: &str;
                    let act: &str;

                    match actions {
                        Actions::Commerce(commerce_actions) => {
                            obj = "commerce";
                            match commerce_actions {
                                CommerceActions::CreateProduct => act = "create_product",
                                CommerceActions::UpdateProduct => act = "update_product",
                                CommerceActions::DeleteProduct => act = "delete_product",
                                CommerceActions::PublishProduct => act = "publish_product",
                                CommerceActions::UnpublishProduct => act = "unpublish_product",
                                CommerceActions::GetAllProducts => act = "get_all_products",
                            };
                        }
                        Actions::Files(files_actions) => {
                            obj = "files";
                            match files_actions {
                                FilesActions::UploadFile => act = "upload_file",
                                FilesActions::DeleteFile => act = "delete_file",
                            }
                        }
                        Actions::Pos(pos_actions) => {
                            obj = "pos";
                            match pos_actions {
                                PosActions::Checkout => act = "checkout",
                                PosActions::GetAllPublishedProducts => {
                                    act = "get_all_published_products"
                                }
                                PosActions::GetCheckoutStats => act = "get_checkout_stats",
                            }
                        }
                        Actions::Users(users_actions) => {
                            obj = "users";
                            match users_actions {
                                UsersActions::GetAllUsers => act = "get_all_users",
                            }
                        }
                    };

                    match enforcer.enforce((sub, obj, act)) {
                        Ok(enforce_result) => {
                            match enforce_result {
                                true => {
                                    tracing::info!(
                                        "🚦 allowing \"{}\" to perform action \"{}\" in \"{}\" module",
                                        sub,
                                        act,
                                        obj
                                    );
                                    Ok(RbacSuccess {}) // verified (sufficient permissions)
                                }
                                false => {
                                    tracing::error!(
                                        "🚦 disallowing \"{}\" to perform action \"{}\" in \"{}\" module",
                                        sub,
                                        act,
                                        obj
                                    );
                                    Err(RbacError::InsufficientPermissions {
                                        sub: sub.to_string(),
                                        obj: obj.to_string(),
                                        act: act.to_string(),
                                    })
                                }
                            }
                        }
                        Err(casbin_error) => {
                            tracing::error!("{}", casbin_error);
                            Err(RbacError::Casbin(casbin_error))
                        }
                    }
                }
                Err(casbin_error) => {
                    tracing::error!("{}", casbin_error);
                    Err(RbacError::Casbin(casbin_error))
                }
            }
        }
        User::AnonymousUser(_) => Err(RbacError::NotLoggedIn),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::auth::users::{AnonymousUser, AnyUser, SignedUser};

    #[tokio::test]
    async fn test_anonymous_user() {
        // It should reject any user which is not logged into the system.
        assert!(matches!(
            verify_permissions(
                &User::AnonymousUser(AnonymousUser::new()),
                &Actions::Commerce(CommerceActions::PublishProduct),
            )
            .await
            .unwrap_err(),
            RbacError::NotLoggedIn
        ))
    }

    #[tokio::test]
    async fn test_signed_user_without_permissions() {
        // This user is signed in but it should not have the right permissions based on the RBAC policy.
        // In fact, there is not policy for it at all which should result in automatic "deny" state.
        assert!(matches!(
            verify_permissions(
                &User::SignedUser(SignedUser::from(AnyUser::mock(&Some(
                    "rbac-mock-id-123".to_string()
                )))),
                &Actions::Commerce(CommerceActions::PublishProduct),
            )
            .await
            .unwrap_err(),
            RbacError::InsufficientPermissions { .. }
        ))
    }

    #[tokio::test]
    async fn test_signed_user_permissions() {
        assert_eq!(
            verify_permissions(
                &User::SignedUser(SignedUser::from(AnyUser::mock(&Some(
                    "users/2".to_string()
                )))),
                &Actions::Commerce(CommerceActions::PublishProduct),
            )
            .await
            .is_ok(),
            true
        )
    }

    #[test]
    fn rbac_error_to_string_test() {
        assert_eq!(
            format!("{}", RbacError::NotLoggedIn),
            String::from("user is not logged in (anonymous)")
        );

        assert_eq!(
            format!(
                "{}",
                RbacError::InsufficientPermissions {
                    sub: "rbac-mock-id-123".to_string(),
                    act: "publish_product".to_string(),
                    obj: "commerce".to_string(),
                }
            ),
            String::from(
                "'rbac-mock-id-123' doesn't have enough permission to perform action 'publish_product' in 'commerce' module"
            )
        );
    }
}
