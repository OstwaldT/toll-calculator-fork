# Toll fee calculator 2.0

A calculator for vehicle toll fees.

## Background

Our city has decided to implement toll fees in order to reduce traffic congestion during rush hours.
This is the current draft of requirements:

-   Fees will differ between 8 SEK and 18 SEK, depending on the time of day
-   Rush-hour traffic will render the highest fee
-   The maximum fee for one day is 60 SEK
-   A vehicle should only be charged once an hour
    -   In the case of multiple fees in the same hour period, the highest one applies.
-   Some vehicle types are fee-free
-   Weekends and holidays are fee-free

## TODO's

In a real world scenario. I would want to confirm some limitations and data points before implementing, such as the flexibility of holidays and timeframes.
Though most things that are subjective enough to need external input are most likely subject to change in the future anyways and should be implemented with that in mind.

-   Confirm the structure and cleanliness of input data. For now, I'm assuming that the current implementation utilises the data in a correct way.
-   Decide on hosting. Inquire about the expected load on this system and required uptime and select hosting based on that. Most likely this would be its own webserver but for increased uptime and availability I would absolutely consider a Kubernetes cluster.
-   Add features for calculating entire months or multiple vehicles in bulk.
-   Maybe add file-based api.
