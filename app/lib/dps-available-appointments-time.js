const moment = require('moment');
const paramParser = require('./param-parser');

let availableAppointmentsByTimeAndPlace = (req, location) => {

    let maxColumnLimit = 3;
    let dates = []
    let locationAvailability = {};

    let dpsAppointmentsAvailability = require('../data/dps-appointments-availability.json');
    let locationChosen = dpsAppointmentsAvailability['locations'][location.toUpperCase()];
    let locationsMaxDates = dpsAppointmentsAvailability['locations']['LONDON'].length;
    console.log(locationChosen)

    let dateParam = paramParser.parseDateTimeParam(req, 'DD-MM-YYYY', 'date');
    let dateParamDiffFromTodaysDate = Math.ceil(moment(dateParam, 'DD-MM-YYYY').diff(moment(), 'days', true));
    console.log(dateParam)
    console.log(dateParamDiffFromTodaysDate)
    


    for (let days = 0; days < maxColumnLimit; days++) {
      dates.push(moment(dateParam, 'DD-MM-YYYY').add(days, 'days'));
    }

    locationAvailability = locationChosen.slice(dateParamDiffFromTodaysDate, maxColumnLimit + dateParamDiffFromTodaysDate);

    for (let i = 0; i < locationAvailability.length; i++){
         locationAvailability[i].date = dates[i];
    }
    
    console.log(locationAvailability )
    return {
        'appointmentsAvailability': locationAvailability,
        'links': createNextAndPreviousLinks(req, dateParam, locationsMaxDates, dateParamDiffFromTodaysDate)
    };

};


let createNextAndPreviousLinks = (req, dateParam, locationsMaxDates, dateParamDiffFromTodaysDate) => {

    //Number of new dates to show in table navigation click
    let navDateIterations = 3;
    let nextDateLink;
    let previousDateLink;

    let todaysDate = moment().format('DD-MM-YYYY');
    let tomorrowsDate = moment().add(1, 'days').format('DD-MM-YYYY');
    let directionParam = paramParser.parseDirectionParam(req);
    let nextDate = moment(dateParam, 'DD-MM-YYYY').add(navDateIterations, 'days');
    let previousDate = moment(dateParam, 'DD-MM-YYYY').subtract(navDateIterations, 'days');

    if(dateParamDiffFromTodaysDate <= 2){
        //Only show next link if first page
        nextDateLink = nextDate.format('DD-MM-YYYY') + "/next";
    } else {
        if (dateParamDiffFromTodaysDate < (locationsMaxDates - 3)) {
           //Show next link if not last page
           nextDateLink = nextDate.format('DD-MM-YYYY') + "/next";
        }

        if (dateParamDiffFromTodaysDate <= 3) {
            previousDateLink = moment().add(2, 'days').format('DD-MM-YYYY') + "/previous";
        } else {
            previousDateLink = previousDate.format('DD-MM-YYYY') + "/previous";

        }
    }

    return {
        'previous': previousDateLink,
        'next': nextDateLink
    }
};

module.exports = {
    availableAppointmentsByTimeAndPlace
};
