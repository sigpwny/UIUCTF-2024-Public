# Solution

This is the solution for "An Unlikely Partnership", the second challenge in the UIUC-Chan suite. It's an OSINT challenge that shows how social media can be used to identify connections between two individuals. I recommend starting with "Hip With the Youth" before reading the writeup for this challenge.

We start with the following description:

```
It appears that the Long Island Subway Authority (LISA) has made a strategic business partnership with a surprise influencer! See if you can figure out who. 
```

And the Threads account we found in the previous challenge:

![LISA Threads profile page, with LinkedIn link](image.png)

The Threads account contains a link to a LinkedIn profile. If you follow the link, you will find a LinkedIn profile for a user named "LISA Transit":

![LISA LinkedIn profile page](image-1.png)

The profile includes posts and experience, and while the user has connections, without being able to follow them you cannot see who they are. However, you can see the user has a skill endorsement from a user named "UIUC-Chan":

![Endorsement form UIUC-Chan for the skill of "Transportation"](image-2.png)

If you click on the profile, you will find that UIUC-Chan's bio contains the flag:

![UIUC-Chan's LinkedIn profle, with a bio containing the flag "uiuctf{0M160D_U1UCCH4N_15_MY_F4V0r173_129301}"](image-3.png)

The flag is `uiuctf{0M160D_U1UCCH4N_15_MY_F4V0r173_129301}`.


> [!TIP]
> If you wanted to complete the challenge before solving "Hip With the Youth", you could have found the LinkedIn profile by using a filter when searching for "Long Island Subway Authority" on your favorite search engine:
>
> ![DuckDuckGo search, 'site:linkedin.com "Long Island Subway Authority"'](image-4.png)
>
> However, the Threads account is the intended and most straightforward path to the LinkedIn profile.