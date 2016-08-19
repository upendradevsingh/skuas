# Application constants (Constant Hook)

## Dependencies

In order for this hook to load, the following other hooks must have already finished loading:

- userconfig


## Dependents

If this hook is disabled, application will be broken.

-- DO NOT DISABLE THIS --

## Purpose

This hook's responsibilities are:


##### Initialize the constants 

When application bootstraps, all the application constants messages,text,templates are added into node globals. These constants are categorised in following three categories.


| Name             | Type                       | Description                                            |
|------------------|:--------------------------:|--------------------------------------------------------|
| `CONTENT`        | ((General text))           |  used to define general pupose text i.e. User name
| `MESSAGE`        | ((User/System messages))   |  Notification messages to be shown to user.
| `TEMPLATE`       | ((Template/View name))     |  Template name




## Events

##### `hook:constants:loaded`

Emitted when this hook has been automatically loaded by Sails core, and triggered the callback in its `initialize` function.
