<!DOCTYPE html>
<html>
<head>
    <title>
        @if ($accepted)
            Team invite accepted
        @else
            Team invite declined
        @endif
    </title>
</head>
<body>
@if($accepted)
    <p>
        <strong>{{$invitee}}</strong> has accepted your invite to join the {{$team}} team!
    </p>
    <p>
        Click on the button below to start collaborating!
    </p>
@else
    <p>
        <strong>{{ $invitee }}</strong> has declined your invite to join the {{$team}} team.
    </p>
@endif

    @if($accepted)
<a href="
        http://localhost:3000/dashboard/teams/{{$teamId}}
" style="padding: 5px 20px;background:orange;color:#fff;font-weight:bold;display:flex;border-radius:25px;width: fit-content;cursor: pointer;">Collaborate!</a>
@endif

</body>
</html>
