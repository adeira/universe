**Designed to speedup development of backoffice forms and their maintenance.** The idea is simple: specify what fields do you want to render, fill them however you want (probably from GraphQL via `useFragment`), let the form collect user inputs and finally map them back to the GraphQL mutation inputs however you want. This gives us flexibility (query and mutations doesn't have to be related or have any special requirements) and clean interface (you only specify what goes in and what goes out).

**Closely integrated with Relay queries/mutations/fragments.** TKTK

**Closely integrated with FBT for translations.** TKTK

**Embracing HTML5 forms.** We are not trying to reinvent a wheel here. The design of these form elements closely follows how HTML works (with some small modifications and improvements) including commonly known validation attributes like `required`, `min`, `max` and similar. You should be able to prototype the form very quickly if you familiar with HTML forms. Flow types are a big help in case you forget.

**Support automatic form persistence (Recoil).** TKTK

**No magic.** It won't try to create a form based on the GraphQL mutation inputs. It won't automatically fill the default values from your GraphQL query. You are in charge.
