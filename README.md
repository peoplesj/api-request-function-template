### About the function
This function is designed to be used within the Slack Workflow Builder that is triggered by a reaction emoji on a message.

### Setup
1. With the Slack CLI installed, clone this function to your local machine using the Slack CLI:
```
slack create get-reacji-message-text --template https://github.com/peoplesj/get-reacji-text-function
```

2. Run the function locally
```
slack run
```
3. Open workflow builder and create a workflow that starts when: someone reacts with {select any emjoi} in #select-a-channel
4. Search for your custom function.
5. Configure the two inputs

The original message text is now stored as a variable in Workflow Builder. 

### Deploy the function
To deploy the function to slack managed infrastructure so it is always available run the command:
```
slack deploy
```

### Distribute your function
Use the following command to decide who can access your function
```
slack function access
```


